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

    // const createBtn = document.querySelector(
    //   ".create-btn"
    // ) as HTMLButtonElement;
    // const modal = document.getElementById("createTaskModal")!;
    // const closeBtn = document.getElementById("closeModal")!;
    // const cancelBtn = document.getElementById("cancelModal")!;
    // const form = document.getElementById("createTaskForm") as HTMLFormElement;

    // // Show modal
    // createBtn?.addEventListener("click", () => {
    //   modal.classList.remove("hidden");
    // });

    // // Hide modal
    // const closeModal = () => modal.classList.add("hidden");
    // closeBtn?.addEventListener("click", closeModal);
    // cancelBtn?.addEventListener("click", closeModal);

    // form?.addEventListener("submit", (e) => {
    //   e.preventDefault();

    // const tasks = {
    //   title: (document.getElementById("taskTitle") as HTMLInputElement).value,
    //   description: (
    //     document.getElementById("taskDescription") as HTMLTextAreaElement
    //   ).value,
    //   status: (
    //     document.getElementById("taskStatus") as HTMLSelectElement
    //   ).value.toLowerCase(),
    //   priority: (
    //     document.getElementById("taskPriority") as HTMLSelectElement
    //   ).value.toLowerCase(),
    //   assignee: (document.getElementById("taskAssignee") as HTMLInputElement)
    //     .value,
    //   dueDate: new Date(
    //     (document.getElementById("taskDueDate") as HTMLInputElement).value
    //   ).toDateString(),
    //   assignedTo: (document.getElementById("taskAssignee") as HTMLInputElement).value,
    // };
    //   console.log("Task Created:", tasks);
    //   closeModal();
    //   form.reset();
    // });
  }
  openModal() {
    // const modelDiv= document.getElementById("createTaskModal");
    // if (modelDiv) {
    //   modelDiv.style.display = "block";
    // }
    this.showModal = true; // Show the modal
  }
  closeModal() {
    // const modelDiv = document.getElementById("createTaskModal");
    // if (modelDiv) {
    //   modelDiv.style.display = "none";
    // }
    this.showModal = false; // Hide the modal
    //this.selectedTodo = null;
    // Reset selectedTodo
    // this.resetForm();
  }
  submitTask(event: Event) {
    const newTask = new Task(
      this.newTask.title,
      this.newTask.desc,
      this.newTask.active,
      this.newTask.status,
      this.newTask.priority,
      this.newTask.dueDate,
      this.newTask.assignedTo
      
    );
    this.tasks.push(newTask); // ✅ this will now work
    
  
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
