export interface ObjectInferface {
  id: number;
  name: string;
  toDoList: TodoInterface[];
  isAddingTodo: boolean;
  isUpdatingTodo: boolean;
}

export interface TodoInterface {
  id?: number;
  name: string;
  isCompleted?: boolean;
}
