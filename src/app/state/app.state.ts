import { TodoState } from "./todo/reducers/todo.reducer";

export interface AppState {
  todos ?: TodoState;
}
