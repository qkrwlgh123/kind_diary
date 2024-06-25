interface Todo {
  id: number;
  name: string;
  object_id: number;
  createdAt: string;
}

export interface ObjectQueryResult {
  id: number;
  object: string;
  date: string;
  createdAt: string;
  toDos: Todo[];
}
