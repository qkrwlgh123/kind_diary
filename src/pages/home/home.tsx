import { useEffect, useRef, useState } from "react";
import CalendarComponent from "../../components/calendar/calendar";
import Todo from "../../components/toDo/toDo";
import Style from "./home.style";
import CenterModal from "../../components/common/modal/center/centerModal";

export interface ObjectInferface {
  id: number;
  name: string;
  toDoList: TodoInterface[];
  isAddingTodo: boolean;
}

export interface TodoInterface {
  id: number;
  name: string;
}

const Home = () => {
  /** 새 목표 생성 Modal on, off 상태 */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /** 새 목표 생성 Modal on, off control 함수 */
  const handleControlModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  /** 선택 월에 해당하는 목표 리스트 */
  const [objectList, setObjectList] = useState<ObjectInferface[]>([]);

  /** 현재 입력중인 목표 */
  const [typedObject, setTypedObject] = useState("");

  /** 목표 입력 함수 */
  const handleTypingObject = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypedObject(event.target.value);
  };

  /** 새 목표 생성 함수 */
  const handleAddObject = () => {
    if (!typedObject) return;

    if (
      objectList
        .map((object: ObjectInferface) => object.name)
        .includes(typedObject)
    ) {
      alert("중복된 목표가 존재합니다");
      return;
    }

    const prevObjectList = objectList;
    const latestObjectId = prevObjectList[prevObjectList.length - 1]?.id || 0;

    setObjectList((prev: ObjectInferface[]) => [
      ...prev,
      {
        id: latestObjectId + 1,
        name: typedObject,
        toDoList: [],
        isAddingTodo: false,
      },
    ]);
    setTypedObject("");
    handleControlModal();
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
  const handleAddTodo = (objectId: number, toDo: TodoInterface) => {
    const updatedObjectList = objectList.map((object) => {
      if (object.id === objectId) {
        return { ...object, toDoList: [...object.toDoList, toDo] };
      } else if (object.isAddingTodo) {
        return { ...object };
      }
      return object;
    });

    setObjectList(updatedObjectList);
  };

  /** Input 창에 대한 참조 생성 */
  const inputRef = useRef<HTMLInputElement>(null);

  /** 모달이 열렸을 때 input 창에 포커스 설정 */
  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModalOpen]);

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
            if (event.key === "Enter") handleAddObject();
          }}
        />
        <div onClick={handleAddObject}>
          <button>생성</button>
        </div>
      </CenterModal>
      <Style.Container>
        <CalendarComponent />
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
