import { useEffect, useRef, useState } from "react";
import CalendarComponent from "../../components/calendar/calendar";
import Todo from "../../components/toDo/toDo";
import Style from "./home.style";
import { handleRequestAddObject } from "../../api/object/add";
import {
  convertDateToMonthString,
  convertDateToString,
} from "../../utils/dateUitls";
import { handleRequestObjectList } from "../../api/object/list";
import { handleRequestAddTodo } from "../../api/todo/add";
import { ObjectInferface, TodoInterface } from "../../types/object";
import { ObjectQueryResult } from "../../types/queryResult/objectList";
import { handleRequestCompleteTodo } from "../../api/todo/complete";
import BottomModal from "../../components/common/modal/bottom/bottomModal";
import { handleRequestUncompleteTodo } from "../../api/todo/unComplete";
import { handleRequestDeleteTodo } from "../../api/todo/delete";
import { handleRequestUpdateTodo } from "../../api/todo/update";
import AddObjectModal from "../../components/modal/addObjectModal/addObjectModal";
import AchievementResult from "../../components/modal/achievementResult/achievementResult";

const Home = () => {
  /** API 요청 응답 전 로딩 상태 */
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  /** 로딩 상태 변경 함수 */
  const handleLoadingIndicator = (value: boolean) => {
    setIsRequestLoading(value);
  };

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
  const [isCenterModalOpen, setIsCenterModalOpen] = useState(false);

  /** 새 목표 생성 Modal on, off control 함수 */
  const handleControlModal = () => {
    setIsCenterModalOpen((prev) => !prev);
  };

  /** 할일, 목표 수정 Modal on, off 상태 */
  const [isBottomModalOpen, setIsBottomModalOpen] = useState(false);

  /** 할일, 목표 수정 Modal on, off control 함수 */
  const handleControlBottomModal = () => {
    setIsBottomModalOpen((prev) => !prev);
  };

  /** 토요일 팝업, 이번 주 성취 결과 Mdoal on, off 상태 */
  const [isAchievementResultModalOpen, setIsAchievementResultModalOpen] =
    useState(false);

  /** 이번 주 성취 결과 Modal on, off control 함수 */
  const handleControlAchievementResultModal = () => {
    setIsAchievementResultModalOpen((prev) => !prev);
  };

  /** 선택 월에 해당하는 모든 목표 리스트 */
  const [wholeObjectList, setWholeObjectList] = useState<ObjectQueryResult[]>(
    []
  );

  /** 선택 일자에 해당하는 목표 리스트 */
  const [objectList, setObjectList] = useState<ObjectInferface[]>([]);

  /** 메뉴박스를 클릭하여 선택한 Todo */
  const [selectedTodo, setSelectedTodo] = useState<TodoInterface>();

  /** 메뉴박스를 클릭하여 Todo 정보를 가져오는 함수 */
  const handleClickMenuboxInTodoComponent = ({
    id,
    name,
    isCompleted,
  }: TodoInterface) => {
    setSelectedTodo({ id, name, isCompleted });
  };

  /** 현재 입력중인 목표 */
  const [typedObject, setTypedObject] = useState("");

  /** 최근 추가된 할일의 상위 목표 id */
  const [parentObjectOfRecentTodo, setParentObjectOfRecentTodo] = useState(0);

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
      const objectList = await handleRequestObjectList(currentMonth);
      setWholeObjectList(objectList.data);

      setTypedObject("");
      handleControlModal();
    }
  };

  /** 목표의 할일 추가 모드 컨트롤 함수 */
  const handleChangeAddingTodoMode = (objectId: number) => {
    const updatedObjectList = objectList.map((object) => {
      if (object.id === objectId) {
        return {
          ...object,
          isAddingTodo: !object.isAddingTodo,
          toDoList: object.toDoList.map((todo) => {
            const { isUpdatingTodo, ...rest } = todo;
            return rest;
          }),
        };
      } else if (object.isAddingTodo) {
        return {
          ...object,
          isAddingTodo: false,
          toDoList: object.toDoList.map((todo) => {
            const { isUpdatingTodo, ...rest } = todo;
            return rest;
          }),
        };
      }
      return object;
    });

    setObjectList(updatedObjectList);
  };

  /** 할일 수정 모드 컨트롤 함수 */
  const handleChangeUpdatingTodoMode = (todoId: number) => {
    const findObjectIdByTodoId = (
      objectList: ObjectInferface[],
      todoId: number
    ) => {
      const todoItem = objectList
        .flatMap((obj) => obj.toDoList)
        .find((item) => item.id === todoId);

      return todoItem?.object_id;
    };

    const foundObjectId = findObjectIdByTodoId(objectList, todoId);

    const updatedObjectList = objectList.map((object) => {
      if (object.id === foundObjectId) {
        return {
          ...object,
          isAddingTodo: false,
          toDoList: object.toDoList.map((todo) => {
            if (todo.id === todoId) {
              if (todo.isUpdatingTodo) {
                return todo;
              } else {
                return { ...todo, isUpdatingTodo: true };
              }
            }
            return todo;
          }),
        };
      }
      return { ...object, isAddingTodo: false };
    });

    setObjectList(updatedObjectList);
    handleControlBottomModal();
  };

  /** 할일 추가 함수 */
  const handleAddTodo = async (objectId: number, toDo: TodoInterface) => {
    const requestResult = await handleRequestAddTodo(objectId, toDo.name);

    /** 할일 완료 요청 성공 시, 월별 목표 리스트 호출 및 갱신, 가장 최근 추가된 목표 id 갱신 */
    if (requestResult) {
      const objectList = await handleRequestObjectList(currentMonth);
      setWholeObjectList(objectList.data);
      setParentObjectOfRecentTodo(objectId);
    }
  };

  /** 할일 수정 함수 */
  const handleUpdateTodo = async (todoId: number, name: string) => {
    const requestResult = await handleRequestUpdateTodo(todoId, name);

    /** 할일 완료 요청 성공 시, 월별 목표 리스트 호출 및 갱신, 가장 최근 추가된 목표 id 갱신 */
    if (requestResult) {
      const objectList = await handleRequestObjectList(currentMonth);
      setWholeObjectList(objectList.data);
    }
  };

  /** 할일 완료 함수 */
  const handleCompleteTodo = async (todoId: number) => {
    const requestCompleteTodoResult = await handleRequestCompleteTodo(todoId);

    /** 할일 완료 요청 성공 시, 월별 목표 리스트 호출 및 갱신 */
    if (requestCompleteTodoResult) {
      const objectList = await handleRequestObjectList(currentMonth);
      setWholeObjectList(objectList.data);
    }
  };

  /** 할일 미완료 함수 */
  const handleUncompleteTodo = async (todoId: number) => {
    const requestUncompleteTodoResult = await handleRequestUncompleteTodo(
      todoId
    );

    /** 할일 미완료 요청 성공 시, 월별 목표 리스트 호출 및 갱신 */
    if (requestUncompleteTodoResult) {
      const objectList = await handleRequestObjectList(currentMonth);
      setWholeObjectList(objectList.data);
      handleControlBottomModal();
    }
  };

  /** 할일 삭제 함수 */
  const handleDeleteTodo = async (todoId: number) => {
    const requestDeleteTodoResult = await handleRequestDeleteTodo(todoId);

    /** 할일 삭제 요청 성공 시, 월별 목표 리스트 호출 및 갱신 */
    if (requestDeleteTodoResult) {
      const objectList = await handleRequestObjectList(currentMonth);
      setWholeObjectList(objectList.data);
      handleControlBottomModal();
    }
  };

  /** Input 창에 대한 참조 생성 */
  const inputRef = useRef<HTMLInputElement>(null);

  /** 모달이 열렸을 때 input 창에 포커스 설정 */
  useEffect(() => {
    if (isCenterModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCenterModalOpen]);

  /** 연-월 변경에 따른 목표 리스트 호출 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await handleRequestObjectList(
          currentMonth,
          handleLoadingIndicator
        );
        setWholeObjectList(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentMonth]);

  /** 현재 날짜 변경에 따라 목표 리스트 업데이트 */
  useEffect(() => {
    // date가 오늘 날짜(currentDate)와 같은 데이터 필터링
    const filteredData = wholeObjectList
      .filter((item) => {
        const itemDate = item.date;
        return itemDate === currentDate;
      })
      .map((object) => {
        if (object.id === parentObjectOfRecentTodo) {
          return {
            id: object.id,
            name: object.object,
            toDoList: object.toDos,
            isAddingTodo: true,
          };
        } else {
          return {
            id: object.id,
            name: object.object,
            toDoList: object.toDos,
            isAddingTodo: false,
          };
        }
      });

    setObjectList(filteredData);
  }, [wholeObjectList, currentDate]);

  /** 매주 토요일, 성취 결과 팝업 on Effect */
  useEffect(() => {
    const todayDateObject = new Date();
    if (todayDateObject.getDay() === 6) {
      const popupFlagInLocalstorage = localStorage.getItem("popup_flag");
      if (!popupFlagInLocalstorage) {
        handleControlAchievementResultModal();
        localStorage.setItem("popup_flag", "alreadyRendered");
      }
      return;
    }
    localStorage.removeItem("popup_flag");
  }, []);

  return (
    <>
      {/* 새 목표 생성 모달 */}
      <AddObjectModal
        inputRef={inputRef}
        isCenterModalOpen={isCenterModalOpen}
        handleControlModal={handleControlModal}
        typedObject={typedObject}
        handleTypingObject={handleTypingObject}
        handleAddObject={handleAddObject}
      />

      {/* 토요일 팝업, 이번 주 성취 결과 */}
      <AchievementResult
        isAchievementResultModalOpen={isAchievementResultModalOpen}
        handleControlAchievementResultModal={
          handleControlAchievementResultModal
        }
      />

      <Style.Container>
        <CalendarComponent
          currentMonth={currentMonth}
          handleChangeMonthInCalendar={handleChangeMonthInCalendar}
          handleClickDateInCalendar={handleClickDateInCalendar}
        />
        <Todo
          currentDate={currentDate}
          handleControlModal={handleControlModal}
          handleControlBottomModal={handleControlBottomModal}
          handleClickMenuboxInTodoComponent={handleClickMenuboxInTodoComponent}
          objectList={objectList}
          isRequestLoading={isRequestLoading}
          handleChangeAddingTodoMode={handleChangeAddingTodoMode}
          handleAddTodo={handleAddTodo}
          handleUpdateTodo={handleUpdateTodo}
          handleCompleteTodo={handleCompleteTodo}
        />
      </Style.Container>

      <BottomModal
        display={isBottomModalOpen ? "flex" : "none"}
        controlFunc={handleControlBottomModal}
      >
        <Style.BottonModalTitle>{selectedTodo?.name}</Style.BottonModalTitle>
        <Style.ButtonsContainer>
          <Style.TodoFuncButton
            onClick={() => {
              if (selectedTodo?.id)
                handleChangeUpdatingTodoMode(selectedTodo.id);
            }}
          >
            수정하기
          </Style.TodoFuncButton>
          <Style.TodoFuncButton
            onClick={() => {
              if (selectedTodo?.id) handleDeleteTodo(selectedTodo.id);
            }}
          >
            삭제하기
          </Style.TodoFuncButton>
        </Style.ButtonsContainer>
        <Style.BottomModalListContainer>
          {selectedTodo?.isCompleted && (
            <div
              onClick={() => {
                if (selectedTodo?.id) handleUncompleteTodo(selectedTodo.id);
              }}
            >
              <span>할일 미완료 처리</span>
            </div>
          )}
        </Style.BottomModalListContainer>
      </BottomModal>
    </>
  );
};

export default Home;
