// i will listen to action

import { Injectable} from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, from, switchMap,of, map, withLatestFrom } from "rxjs";
import { TodoService } from "src/app/todo/services/todo.service";
import { AddTodo, DeleteTodo, LoadTodo, LoadTodoFail, LoadTodoSuccess } from "../actions/todo.actions";
import { selectAllTodos } from "../selectors/todo.selector";

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private todoServices: TodoService
  ) { }
    // Run this code when a loadTodos action is dispatched
    loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadTodo),
      switchMap(() =>
        // Call the getTodos method, convert it to an observable
        from(this.todoServices.getTodos()).pipe(
          // Take the returned value and return a new success action containing the todos
          map((todos) => LoadTodoSuccess({ LoadingMycontent: todos })),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(LoadTodoFail({ Error: error })))
        )
      )
    )
  );

    // Run this code when the addTodo or removeTodo action is dispatched
    saveTodo$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AddTodo, DeleteTodo),
          withLatestFrom(this.store.select(selectAllTodos!)),
          switchMap(([action, todos]) => from(this.todoServices.saveTodos(todos))),
        ),
      // Most effects dispatch another action, but this one is just a "fire and forget" effect
      { dispatch: false }
    );

}
