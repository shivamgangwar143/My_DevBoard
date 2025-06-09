import { Component, Output,EventEmitter, OnInit } from '@angular/core';
import { Todo } from '../Todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter();

  title: string = ""
  desc: string = ""

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
      const todo = {
        sno: 0,
        title: this.title,
        desc: this.desc,
        active: true
      }

      this.todoAdd.emit(todo);

      this.title = '';
      this.desc = '';

    }

}
