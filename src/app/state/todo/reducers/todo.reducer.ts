import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { Todo } from "src/app/todo/models/todo.model";
import { AddTodo, DeleteTodo, LoadTodo, LoadTodoFail, LoadTodoSuccess } from "../actions/todo.actions";

export interface TodoState {
  Todos: Todo[];
  error ?: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: TodoState = {
  Todos: [],
  error : null,
  status: "pending"
}

export const todoReducer = createReducer(
  initialState,
  // in case of adding new todo
  on(AddTodo, (state, { TakeTodoContentFromYou }) => ({
    ...state,
    // add this content to todos
    Todos: [...state.Todos, { id: Date.now().toString(), content: TakeTodoContentFromYou }],
    error: null,
    status: "success"
  })),
  // in case of deleting new todo
  on(DeleteTodo, (state, { TakeTodoIdFromYou }) => ({
    ...state,
    // add this content to todos
    Todos: state.Todos.filter(Todo => Todo.id !== TakeTodoIdFromYou),
    error: null,
    status: "success"
  })),
  // in case of Loading todo
  on(LoadTodo, (state) => ({
    ...state,
    status: 'loading'
  })),
   // in case of Loading todo successfully
   on(LoadTodoSuccess, (state, {LoadingMycontent}) => ({
    ...state,
    Todos: LoadingMycontent,
    error: null,
    status: 'success'
  })),
  // in case of Loading todo Fail
  on(LoadTodoFail, (state, {Error}) => ({
    ...state,
    error: Error,
    status:'error'
  })),
)
