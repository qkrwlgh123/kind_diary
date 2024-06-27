import { useEffect, useRef, useState } from "react";
import CalendarComponent from "../../components/calendar/calendar";
import Todo from "../../components/toDo/toDo";
import Style from "./home.style";
import CenterModal from "../../components/common/modal/center/centerModal";
import { handleRequestAddObject } from "../../api/object/add";
import {
  convertDateToMonthString,
  convertDateToString,
} from "../../utils/dateUitls";
import { handleRequestObjectList } from "../../api/object/list";
import { handleRequestAddTodo } from "../../api/todo/add";
import { ObjectInferface, TodoInterface } from "../../types/object";
import { ObjectQueryResult } from "../../types/queryResult/objectList";
import Button from "../../components/common/button/button";

const Home = () => {
  /** 현재 선택된 연-월 => 월 별 목표 리스트 서버 호출 */
  const [currentMonth, setCurrentMonth] = useState(
    convertDateToMonthString(new Date())
  );

  /** 현재 선택된 연-월-일 => 일자 별 목표 리스트 업데이트 */
  const [currentDate, setCurrentDate] = useState(
    convertDateToString(new Date())
  );

  /** 월 선택에 따른 current Month 갱신 함수 */
  const handleChangeMonthInCalendar = (date: Date) => {
    setCurrentMonth(convertDateToMonthString(date));
  };

  /** 일자 선택에 따른 current Date 갱신 함수 */
  const handleClickDateInCalendar = (date: Date) => {
    setCurrentDate(convertDateToString(date));
  };

  /** 새 목표 생성 Modal on, off 상태 */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /** 새 목표 생성 Modal on, off control 함수 */
  const handleControlModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  /** 선택 월에 해당하는 모든 목표 리스트 */
  const [wholeObjectList, setWholeObjectList] = useState<ObjectQueryResult[]>(
    []
  );

  /** 선택 일자에 해당하는 목표 리스트 */
  const [objectList, setObjectList] = useState<ObjectInferface[]>([]);

  /** 현재 입력중인 목표 */
  const [typedObject, setTypedObject] = useState("");

  /** 목표 입력 함수 */
  const handleTypingObject = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypedObject(event.target.value);
  };

  /** 새 목표 생성 함수 */
  const handleAddObject = async () => {
    if (!typedObject) return;

    if (
      objectList
        .map((object: ObjectInferface) => object.name)
        .includes(typedObject)
    ) {
      alert("중복된 목표가 존재합니다");
      return;
    }

    const requestResult = await handleRequestAddObject(
      typedObject,
      currentDate
    );

    if (requestResult) {
      setObjectList((prev: ObjectInferface[]) => [
        ...prev,
        {
          id: requestResult.data.id,
          name: typedObject,
          toDoList: [],
          isAddingTodo: false,
        },
      ]);

      setTypedObject("");
      handleControlModal();
    }
  };

  /** 오브젝트의 할일 추가 모드 컨트롤 함수 */
  const handleChangeAddingTodoMode = (objectId: number) => {
    const updatedObjectList = objectList.map((object) => {
      if (object.id === objectId) {
        return { ...object, isAddingTodo: !object.isAddingTodo };
      } else if (object.isAddingTodo) {
        return { ...object, isAddingTodo: false };
      }
      return object;
    });

    setObjectList(updatedObjectList);
  };

  /** 할일 추가 함수 */
  const handleAddTodo = async (objectId: number, toDo: TodoInterface) => {
    const requestResult = await handleRequestAddTodo(objectId, toDo.name);

    if (requestResult) {
      const updatedObjectList = objectList.map((object) => {
        if (object.id === objectId) {
          return {
            ...object,
            toDoList: [
              ...object.toDoList,
              { id: requestResult.data.id, name: requestResult.data.name },
            ],
          };
        } else if (object.isAddingTodo) {
          return { ...object };
        }
        return object;
      });

      setObjectList(updatedObjectList);
    }
  };

  /** Input 창에 대한 참조 생성 */
  const inputRef = useRef<HTMLInputElement>(null);

  /** 모달이 열렸을 때 input 창에 포커스 설정 */
  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModalOpen]);

  /** 연-월 변경에 따른 목표 리스트 호출 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await handleRequestObjectList(currentMonth);
        setWholeObjectList(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentMonth]);

  /** 현재 날짜 변경에 따라 목표 리스트 업데이트 */
  useEffect(() => {
    // createdAt 날짜가 오늘 날짜와 같은 데이터 필터링
    const filteredData = wholeObjectList
      .filter((item) => {
        const itemDate = item.date;
        return itemDate === currentDate;
      })
      .map((object) => ({
        id: object.id,
        name: object.object,
        toDoList: object.toDos,
        isAddingTodo: false,
      }));
    setObjectList(filteredData);
  }, [wholeObjectList, currentDate]);
  return (
    <>
      <CenterModal
        display={isModalOpen ? "flex" : "none"}
        controlFunc={handleControlModal}
      >
        <div>
          <h3>새 목표 생성</h3>
        </div>
        <input
          ref={inputRef}
          placeholder="목표 이름"
          value={typedObject}
          onChange={handleTypingObject}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              if (event.nativeEvent.isComposing) {
                return;
              }
              handleAddObject();
            }
          }}
        />

        <Button onClickFunc={handleAddObject}>생성</Button>
      </CenterModal>
      <Style.Container>
        <CalendarComponent
          currentMonth={currentMonth}
          handleChangeMonthInCalendar={handleChangeMonthInCalendar}
          handleClickDateInCalendar={handleClickDateInCalendar}
        />
        <Todo
          handleControlModal={handleControlModal}
          objectList={objectList}
          handleChangeAddingTodoMode={handleChangeAddingTodoMode}
          handleAddTodo={handleAddTodo}
        />
      </Style.Container>
    </>
  );
};

export default Home;
