import { Component, OnInit, HostListener } from "@angular/core";
import { AuthService } from "../auth.service";
import { Task } from "../task"; // Import Task model

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  leftWidth = 23; // in percentage
  rightWidth = 26;
  resizing = false;
  selectedTodo: any;
  showCreateTask: boolean = false;
  userEmail: string | null = null;
  userName: string | null = null;
  userRole: string | null = null;
  showBox = false;
  showModal = false; // For modal visibility

  tasks: Task[] | any; // Array to hold tasks
  newTask: Task = new Task("", "", true, "", "", "", ""); // New task object

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.userName = this.auth.getUserEmail();
    this.userRole = this.auth.getUserRole();
    const savedTasks = localStorage.getItem("tasks");
    this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
console.log(this.tasks);
  }
  openModal() {
    this.showModal = true; // Show the modal
  }

  closeModal() {
    this.showModal = false; // Hide the modal
  }
  submitTask(event: Event) {
    const taskk = new Task(
      this.newTask.title,
      this.newTask.desc,
      this.newTask.active,
      this.newTask.status,
      this.newTask.priority,
      this.newTask.dueDate,
      this.newTask.assignedTo
      
    );
    console.log(event, "enee")
    console.log(this.newTask)
    this.tasks.push(this.newTask,"Task card created successfully"); 
    
  
    // Save tasks to localStorage
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    this.closeModal();
    this.newTask = new Task("", "", true, "", ""); // Reset newTask
    this.showCreateTask = false;
  }

  editTask(task: Task) {
    console.log("Edit task clicked", task);
    this.selectedTodo = task;
    this.showCreateTask = true;
    this.openModal();
  }
  deleteTask(task: Task) {
    console.log("Delete task clicked", task);
    const index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      console.log("Task deleted");
    } else {
      console.error("Task not found");
    }
  }
  toggleTask(task: Task) {
    console.log("Toggle task clicked", task);
    const index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks[index].active = !this.tasks[index].active;
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      console.log("Task toggled");
    } else {
      console.error("Task not found");
    }
  }
  addTask(task: Task) {
    console.log("Add task clicked", task);
    if (!this.tasks) {
      this.tasks = [];
    }
    this.tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    console.log("Task added");
  }
  // Function to toggle the visibility of the three dots menu
  // This function is called when the three dots icon is clicked
  threeDots() {
    this.showBox = !this.showBox;
    console.log("threeDots clicked", this.showBox);
  }

  startResize(event: MouseEvent) {
    this.resizing = true;
    event.preventDefault();
  }

  toggleCreateTask() {
    this.showCreateTask = !this.showCreateTask;
  }
  logout() {
    this.auth.logout();
    console.log("Logged out");
  }

  @HostListener("document:mousemove", ["$event"])
  onMouseMove(event: MouseEvent) {
    if (this.resizing) {
      const currentX = event.clientX;
      let pixels = (this.leftWidth / 100) * window.innerWidth;

      const direction = currentX > pixels ? "right" : "left";
      //dragArea.textContent = `Dragging ${direction}`;
      console.log(this.leftWidth, direction, currentX);
      if (this.leftWidth < 26 && direction == "left") return;
      const totalWidth = window.innerWidth;
      this.leftWidth = (event.clientX / totalWidth) * 100;
      this.rightWidth = 100 - this.leftWidth;
    }
  }

  @HostListener("document:mouseup")
  stopResize() {
    this.resizing = false;
  }
}
