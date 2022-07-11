import { createAction, props } from "@ngrx/store";
import { Todo } from "src/app/todo/models/todo.model";

export const enum operations {
  AddTodo = '[Todo page] Add Todo content',
  DeleteTodo = '[Todo page] Delete Todo',
  LoadTodo = '[Todo page] Load Todos',
  LoadTodoSuccess = '[Todo page] Load Todos successfully',
  LoadTodoFail = '[Todo page] Load Todos Fail',
}

export const LoadTodo = createAction(
  operations.LoadTodo
);

export const LoadTodoSuccess = createAction(
  operations.LoadTodoSuccess,
  props<{ LoadingMycontent: Todo[] }>()
);


export const LoadTodoFail = createAction(
  operations.LoadTodoFail,
  props<{ Error: string }>()
);

export const AddTodo = createAction(
  operations.AddTodo,
  props<{ TakeTodoContentFromYou: string }>()
);

export const DeleteTodo = createAction(
  operations.DeleteTodo,
  props<{ TakeTodoIdFromYou: string }>()
);
