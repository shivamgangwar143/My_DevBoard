import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  leftWidth = 20; // in percentage
  rightWidth = 50;
  resizing = false;
  selectedTodo: any;
  showCreateTask: boolean = false;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  startResize(event: MouseEvent) {
      this.resizing = true;
      event.preventDefault();
    }

    toggleCreateTask() {
      this.showCreateTask = !this.showCreateTask;
      console.log("working"); 
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
