import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AddTodo, DeleteTodo, LoadTodo } from 'src/app/state/todo/actions/todo.actions';
import { selectAllTodos } from 'src/app/state/todo/selectors/todo.selector';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  // Reference for storing all todo data
  public allTodos$ = this.store.select(selectAllTodos);
  // Reference for adding todo
  public todoContent: string = '';

  constructor(private store: Store) { }

  ngOnInit(): void {
    // first make load data dispatch
    // for making effect run and load data
    this.store.dispatch(LoadTodo());

  }

  addTodo(){
    if(this.todoContent.length > 0){
      this.store.dispatch(AddTodo({TakeTodoContentFromYou: this.todoContent}))
      this.todoContent = '';
    }
  }

  deleteTodo(id: string){
    setTimeout(() => {
    this.store.dispatch(DeleteTodo({TakeTodoIdFromYou: id}));
    }, 500)
  }

  onFilterChange(event: any){
    console.log(event.checked)
  }
}
