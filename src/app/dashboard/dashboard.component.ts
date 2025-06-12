import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../auth.service';
import { Task } from '../task';


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
  userEmail: string | null = null;
  userName: string | null = null;
  userRole: string | null = null;
  tasks: Task[] = []; // Initialize tasks array

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.userName= this.auth.getUserEmail();
    this.userRole = this.auth.getUserRole();
  }

  startResize(event: MouseEvent) {
      this.resizing = true;
      event.preventDefault();
    }

    toggleCreateTask() {
      this.showCreateTask = !this.showCreateTask;
      console.log("working"); 
    }
    logout() {
      this.auth.logout();
      console.log("Logged out");
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
