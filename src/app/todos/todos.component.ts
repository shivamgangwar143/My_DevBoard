import { Component, OnInit } from '@angular/core';
import { Todo } from '../Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  localItem: string | null;
  todos: Todo[] | any;

  constructor() { 
    this.localItem = localStorage.getItem("todos");
    if(this.localItem == null) {
    this.todos = [];
  }
  else {
    this.todos = JSON.parse(this.localItem);
  }
  }

  ngOnInit(): void {
  }

  deleteTodo(todo: Todo) {
    console.log(todo);
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(this.todos));
    console.log("Todo deleted");
  }
  addTodo(todo: Todo) {
    console.log("Add todo");
    this.todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(this.todos));
    console.log("Todo added");
  }

  toggleTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todos[index].active = !this.todos[index].active;
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  editTodo(todo: Todo): void {
    const index = this.todos.findIndex((t: { sno: number; }) => t.sno === todo.sno);
    if (index !== -1) {
      this.todos[index] = todo;
      localStorage.setItem("todos", JSON.stringify(this.todos));
      console.log("Todo edited");
    }
  }

}
