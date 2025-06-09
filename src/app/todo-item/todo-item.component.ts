import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo!: Todo;
  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter();
  @Output() todoCheckbox: EventEmitter<Todo> = new EventEmitter();
  @Output() todoEdit: EventEmitter<Todo> = new EventEmitter();

  isEditing = false;
  editableTitle: string = '';
  editableDesc: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onClick(todo:Todo) {
      this.todoDelete.emit(todo);
      //console.log("onClick has been triggered");
  }

    onCheckboxClick(todo:Todo) {
      this.todoCheckbox.emit(todo);    
    }

    onEditClick(todo:Todo) {
      this.todoEdit.emit(todo);
      // console.log("onEditClick has been triggered");
    }

    startEditing() {
      this.isEditing = true;
      this.editableTitle = this.todo.title;
      this.editableDesc = this.todo.desc;
    }
    saveEdit() {
      this.todo.title = this.editableTitle;
      this.todo.desc = this.editableDesc;
      this.todoEdit.emit(this.todo);
      this.isEditing = false;
      console.log("Todo edited");
    }
    cancelEdit() {
      this.isEditing = false;
      this.editableTitle = '';
      this.editableDesc = '';
      console.log("Edit cancelled");
    }
}


