import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { TodoState } from "../reducers/todo.reducer";

export const selectTodo = (state: AppState) => state.todos!;

export const selectAllTodos = createSelector(
  selectTodo,
  (state: TodoState) => state.Todos
)
