export interface ObjectInferface {
  id: number;
  name: string;
  toDoList: TodoInterface[];
  isAddingTodo: boolean;
}

export interface TodoInterface {
  id?: number;
  name: string;
  object_id?: number;
  isCompleted?: boolean;
  isUpdatingTodo?: boolean;
}
