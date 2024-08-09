import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ObjectInferface, TodoInterface } from "../../types/object";
import { convertDateToFullDateString } from "../../utils/dateUitls";
import ObjectSkeleton from "../common/loadingIndicator/skeletonUIComponent/object/objectSkeleton";
import AddNewObject from "./newObject/addNewObject";
import Object from "./object/object";
import Placeholder from "./placeholder/placeholder";
import Style from "./toDo.style";
import { handleRequestObjectList } from "../../api/object/list";
import { useEffect, useRef, useState } from "react";
import { ObjectQueryResult } from "../../types/queryResult/objectList";
import AddObjectModal from "../modal/addObjectModal/addObjectModal";
import { handleRequestAddObject } from "../../api/object/add";
import { handleRequestAddTodo } from "../../api/todo/add";
import ManipulateTodoInfo from "../modal/manipulateObjectOrTodo/manipulateTodoInfo/manipulateTodoInfo";
import { handleRequestDeleteTodo } from "../../api/todo/delete";
import { handleRequestUncompleteTodo } from "../../api/todo/unComplete";
import { handleRequestCompleteTodo } from "../../api/todo/complete";
import { handleRequestUpdateTodo } from "../../api/todo/update";
import ManipulateObjectInfo from "../modal/manipulateObjectOrTodo/manipulateObjectInfo/manipulateObjectInfo";
import { handleRequestDeleteObject } from "../../api/object/delete";

const Todo = ({
  currentMonth,
  currentDate,
}: {
  currentMonth: string;
  currentDate: string;
}) => {
  /**
   * 쿼리 영역
   * ====================
   */

  const queryClient = useQueryClient();

  /** 캘린더 내 연-월에 해당하는 목표를 렌더링 하기 위한 useQuery 호출, [캐시 옵션: 30분] */
  const { data, isFetching } = useQuery<{
    code: number;
    data: ObjectQueryResult[];
  }>({
    queryKey: ["TodoData", currentMonth],
    queryFn: () => handleRequestObjectList(currentMonth),
    staleTime: 30 * 60 * 1000,
  });

  /**
   * ====================
   */

  /**
   * 입력 필드 영역
   * ====================
   */

  /** 새 목표 생성 Modal on, off 상태 */
  const [isCenterModalOpen, setIsCenterModalOpen] = useState(false);

  /** 새 목표 생성 Modal on, off control 함수 */
  const handleControlModal = () => {
    setIsCenterModalOpen((prev) => !prev);
  };

  /** Input 창에 대한 참조 생성 */
  const inputRef = useRef<HTMLInputElement>(null);

  /** 모달이 열렸을 때 input 창에 포커스 설정 */
  useEffect(() => {
    if (isCenterModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCenterModalOpen]);

  /**
   * ====================
   */

  /**
   * 목표 입력 및 생성 영역
   * ====================
   */

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

    /** 생성 요청 쿼리가 정상적으로 완료 되었다면, 캐시 데이터 업데이트 */
    if (requestResult.code === 201) {
      const newObject = {
        id: requestResult.data.id,
        object: typedObject,
        date: currentDate,
        createdAt: requestResult.data.createdAt,
        toDos: [],
      };

      queryClient.setQueryData<{
        code: number;
        data: ObjectQueryResult[];
      }>(["TodoData", currentMonth], (oldData) => {
        if (oldData) {
          return {
            ...oldData,
            data: [...oldData.data, newObject],
          };
        } else {
          return { code: 201, data: [newObject] };
        }
      });

      setTypedObject("");
      handleControlModal();
    }
  };

  /**
   * ====================
   */

  /**
   * 할일 추가 영역
   * ====================
   */

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

  /** 할일 추가 함수 */
  const handleAddTodo = async (objectId: number, toDo: TodoInterface) => {
    const requestResult = await handleRequestAddTodo(objectId, toDo.name);

    /** 할일 생성 완료 성공 시, 월별 목표 캐시 데이터 갱신, 가장 최근 추가된 목표 id 갱신 */
    if (requestResult.code === 201) {
      const newTodo = {
        id: requestResult.data.id,
        name: requestResult.data.name,
        object_id: requestResult.data.object_id,
        createdAt: requestResult.data.createdAt,
        isCompleted: requestResult.data.isCompleted,
      };

      queryClient.setQueryData<{
        code: number;
        data: ObjectQueryResult[];
      }>(["TodoData", currentMonth], (oldData) => {
        if (oldData) {
          return {
            ...oldData,
            data: oldData.data.map((object) => {
              if (object.id === objectId) {
                return { ...object, toDos: [...object.toDos, newTodo] };
              } else {
                return { ...object };
              }
            }),
          };
        } else {
          const existingData = queryClient.getQueryData<{
            code: number;
            data: ObjectQueryResult[];
          }>(["TodoData", currentMonth]);
          return {
            code: 201,
            data: existingData?.data || [],
          };
        }
      });

      setParentObjectOfRecentTodo(objectId);
    }
  };

  /** 최근 추가된 할일의 상위 목표 id */
  const [parentObjectOfRecentTodo, setParentObjectOfRecentTodo] = useState(0);

  /**
   * ====================
   */

  /**
   * 목표 & 할일 수정, 삭제, 완료 / 미완료 처리 영역
   * ====================
   */

  /**
   * 할일 편집 영역
   * ====================
   */

  /** 메뉴박스를 클릭하여 선택한 Todo */
  const [selectedTodo, setSelectedTodo] = useState<TodoInterface>();

  /** 할일 수정 Modal on, off 상태 */
  const [isBottomModalOpen, setIsBottomModalOpen] = useState(false);

  /** 할일 수정 Modal control 함수 */
  const handleControlBottomModal = () => {
    setIsBottomModalOpen((prev) => !prev);
  };

  /** 메뉴박스를 클릭하여 Todo 정보를 가져오는 함수 */
  const handleClickMenuboxInTodoComponent = ({
    id,
    name,
    isCompleted,
    object_id,
  }: TodoInterface) => {
    setSelectedTodo({ id, name, isCompleted, object_id });
  };

  /** 할일 수정 모드 진입 함수 */
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
            } else {
              return { ...todo, isUpdatingTodo: false };
            }
          }),
        };
      }
      return {
        ...object,
        isAddingTodo: false,
        toDoList: object.toDoList.map((todo) => {
          return { ...todo, isUpdatingTodo: false };
        }),
      };
    });

    setObjectList(updatedObjectList);
    handleControlBottomModal();
  };

  /** 할일 수정 함수 */
  const handleUpdateTodo = async (
    objectId: number,
    todoId: number,
    name: string
  ) => {
    const requestResult = await handleRequestUpdateTodo(todoId, name);

    /** 할일 수정 요청 성공 시, 월별 목표 리스트 호출 및 갱신, 가장 최근 추가된 목표 id 갱신 */
    if (requestResult.code === 200) {
      queryClient.setQueryData<{
        code: number;
        data: ObjectQueryResult[];
      }>(["TodoData", currentMonth], (oldData) => {
        if (oldData) {
          return {
            ...oldData,
            data: oldData.data.map((object) => {
              if (object.id === objectId) {
                return {
                  ...object,
                  toDos: object.toDos.map((todo) => {
                    if (todo.id === todoId) {
                      return { ...todo, name };
                    } else {
                      return { ...todo };
                    }
                  }),
                };
              } else {
                return { ...object };
              }
            }),
          };
        } else {
          const existingData = queryClient.getQueryData<{
            code: number;
            data: ObjectQueryResult[];
          }>(["TodoData", currentMonth]);
          return {
            code: 201,
            data: existingData?.data || [],
          };
        }
      });

      /** 최근 추가된 할일의 상위 목표 id 초기화 */
      setParentObjectOfRecentTodo(0);
    }
  };

  /** 할일 삭제 함수 */
  const handleDeleteTodo = async (objectId: number, todoId: number) => {
    const requestDeleteTodoResult = await handleRequestDeleteTodo(todoId);

    /** 할일 삭제 요청 성공 시, 월별 목표 리스트 호출 및 갱신 */
    if (requestDeleteTodoResult.code === 200) {
      queryClient.setQueryData<{
        code: number;
        data: ObjectQueryResult[];
      }>(["TodoData", currentMonth], (oldData) => {
        if (oldData) {
          return {
            ...oldData,
            data: oldData.data.map((object) => {
              if (object.id === objectId) {
                return {
                  ...object,
                  toDos: object.toDos.filter((todo) => todo.id !== todoId),
                };
              } else {
                return { ...object };
              }
            }),
          };
        } else {
          const existingData = queryClient.getQueryData<{
            code: number;
            data: ObjectQueryResult[];
          }>(["TodoData", currentMonth]);
          return {
            code: 201,
            data: existingData?.data || [],
          };
        }
      });

      handleControlBottomModal();
    }
  };

  /** 할일 완료 함수 */
  const handleCompleteTodo = async (objectId: number, todoId: number) => {
    const requestCompleteTodoResult = await handleRequestCompleteTodo(todoId);

    /** 할일 완료 요청 성공 시, 월별 목표 리스트 캐시 데이터 갱신 */
    if (requestCompleteTodoResult.code === 200) {
      queryClient.setQueryData<{
        code: number;
        data: ObjectQueryResult[];
      }>(["TodoData", currentMonth], (oldData) => {
        if (oldData) {
          return {
            ...oldData,
            data: oldData.data.map((object) => {
              if (object.id === objectId) {
                return {
                  ...object,
                  toDos: object.toDos.map((todo) => {
                    if (todo.id === todoId) {
                      return { ...todo, isCompleted: true };
                    } else {
                      return { ...todo };
                    }
                  }),
                };
              } else {
                return { ...object };
              }
            }),
          };
        } else {
          const existingData = queryClient.getQueryData<{
            code: number;
            data: ObjectQueryResult[];
          }>(["TodoData", currentMonth]);
          return {
            code: 201,
            data: existingData?.data || [],
          };
        }
      });
    }
  };

  /** 할일 미완료 함수 */
  const handleUncompleteTodo = async (objectId: number, todoId: number) => {
    const requestUncompleteTodoResult = await handleRequestUncompleteTodo(
      todoId
    );

    /** 할일 미완료 요청 성공 시, 월별 목표 리스트 캐시 데이터 갱신 */
    if (requestUncompleteTodoResult.code === 200) {
      queryClient.setQueryData<{
        code: number;
        data: ObjectQueryResult[];
      }>(["TodoData", currentMonth], (oldData) => {
        if (oldData) {
          return {
            ...oldData,
            data: oldData.data.map((object) => {
              if (object.id === objectId) {
                return {
                  ...object,
                  toDos: object.toDos.map((todo) => {
                    if (todo.id === todoId) {
                      return { ...todo, isCompleted: false };
                    } else {
                      return { ...todo };
                    }
                  }),
                };
              } else {
                return { ...object };
              }
            }),
          };
        } else {
          const existingData = queryClient.getQueryData<{
            code: number;
            data: ObjectQueryResult[];
          }>(["TodoData", currentMonth]);
          return {
            code: 201,
            data: existingData?.data || [],
          };
        }
      });

      handleControlBottomModal();
    }
  };

  /**
   * ====================
   */

  /**
   * 목표 편집 영역
   * ====================
   */

  /** 목표 편집 버튼을 클릭하여 선택한 Object */
  const [selectedObject, setSelectedObject] = useState<{
    id: number;
    name: string;
    toDoList: TodoInterface[];
  }>({ id: 0, name: "", toDoList: [] });

  /** 목표 수정 Modal on, off 상태 */
  const [isBottomModalOfObjectOpen, setIsBottomModalOfObjectOpen] =
    useState(false);

  /** 목표 수정 Modal control 함수 */
  const handleControlBottomModalofObject = () => {
    setIsBottomModalOfObjectOpen((prev) => !prev);
  };

  /** 목표 편집 버튼을 클릭하여 Object 정보를 가져오는 함수 */
  const handleClickEditIconInObject = ({
    id,
    name,
    toDoList,
  }: {
    id: number;
    name: string;
    toDoList: TodoInterface[];
  }) => {
    setSelectedObject({ id, name, toDoList });
  };

  /** 목표 삭제 함수 */
  const handleDeleteObject = async (objectId: number) => {
    if (selectedObject.toDoList.length > 0) {
      alert("목표를 이루기 위한 해야할 작업들이 남아있습니다.");
      return;
    }

    const requestDeleteTodoResult = await handleRequestDeleteObject(objectId);

    /** 할일 삭제 요청 성공 시, 월별 목표 리스트 호출 및 갱신 */
    if (requestDeleteTodoResult.code === 200) {
      queryClient.setQueryData<{
        code: number;
        data: ObjectQueryResult[];
      }>(["TodoData", currentMonth], (oldData) => {
        if (oldData) {
          return {
            ...oldData,
            data: oldData.data.filter((object) => object.id !== objectId),
          };
        } else {
          const existingData = queryClient.getQueryData<{
            code: number;
            data: ObjectQueryResult[];
          }>(["TodoData", currentMonth]);
          return {
            code: 200,
            data: existingData?.data || [],
          };
        }
      });

      handleControlBottomModalofObject();
    }
  };

  /**
   * ====================
   */

  /**
   * ====================
   */

  /**
   * 목표 & 할일 리스트 업데이트 영역
   * ====================
   */

  /** 선택 일자에 해당하는 목표 리스트 */
  const [objectList, setObjectList] = useState<ObjectInferface[]>([]);

  /** 현재 날짜 변경에 따라 목표 리스트 업데이트, 최근 추가된 목표의 경우 할일 추가 모드 유지 */
  useEffect(() => {
    if (data) {
      // date가 오늘 날짜(currentDate)와 같은 데이터 필터링
      const filteredData = data.data
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
    }
  }, [data, currentDate, parentObjectOfRecentTodo]);

  /**
   * ====================
   */
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

      <Style.TodoContainer>
        {/* 새 목표 생성 버튼 */}
        <AddNewObject handleControlModal={handleControlModal} />

        {/* 선택된 날짜에 해당하는 연-월-일 문자열 */}
        <Style.SelectedDateBox>
          <span>{convertDateToFullDateString(currentDate)}</span>
        </Style.SelectedDateBox>

        <Style.ObjectListContainer>
          {isFetching ? (
            <ObjectSkeleton />
          ) : objectList && objectList.length > 0 ? (
            objectList.map((object: ObjectInferface, index: number) => (
              <Object
                key={object.id}
                id={object.id}
                name={object.name}
                handleControlBottomModal={handleControlBottomModal}
                handleControlBottomModalOfObject={
                  handleControlBottomModalofObject
                }
                handleClickMenuboxInTodoComponent={
                  handleClickMenuboxInTodoComponent
                }
                handleClickEditIconInObject={handleClickEditIconInObject}
                toDoList={object.toDoList}
                isAddingTodo={object.isAddingTodo}
                handleChangeAddingTodoMode={handleChangeAddingTodoMode}
                handleAddTodo={handleAddTodo}
                handleUpdateTodo={handleUpdateTodo}
                handleCompleteTodo={handleCompleteTodo}
                index={index}
              />
            ))
          ) : (
            <Placeholder />
          )}
        </Style.ObjectListContainer>
      </Style.TodoContainer>

      {/* 목표 또는 할일 편집을 위한 Bottom Modal 영역 */}
      <ManipulateTodoInfo
        isBottomModalOpen={isBottomModalOpen}
        handleControlBottomModal={handleControlBottomModal}
        selectedTodo={selectedTodo}
        handleChangeUpdatingTodoMode={handleChangeUpdatingTodoMode}
        handleDeleteTodo={handleDeleteTodo}
        handleUncompleteTodo={handleUncompleteTodo}
      />
      <ManipulateObjectInfo
        isBottomModalOpen={isBottomModalOfObjectOpen}
        handleControlBottomModal={handleControlBottomModalofObject}
        selectedObject={selectedObject}
        handleDeleteObject={handleDeleteObject}
      />
    </>
  );
};

export default Todo;
