import { Component, OnInit, HostListener } from '@angular/core';
import { Todo } from '../Todo';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  localItem: string | null;
  todos: Todo[] | any;
  leftWidth = 20; // in percentage
  rightWidth = 50;
  resizing = false;
  selectedTodo: any;
  showCreateTask: boolean = false;

  constructor(public auth: AuthService) { 
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

  toggleCreateTask() {
    this.showCreateTask = !this.showCreateTask;
    console.log("working");
    
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
  startResize(event: MouseEvent) {
    this.resizing = true;
    event.preventDefault();
  }
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.resizing) {
      const totalWidth = window.innerWidth;
      this.leftWidth = (event.clientX / totalWidth) * 100;
      this.rightWidth = 100 - this.leftWidth;
    }
  }

  @HostListener('document:mouseup')
  stopResize() {
    this.resizing = false;
  }


}
