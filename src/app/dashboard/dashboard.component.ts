import { Component, OnInit, HostListener } from "@angular/core";
import { AuthService } from "../auth.service";
import { Task } from "../task"; // Import Task model
import { TaskService } from "../task.service"; // Import TaskService


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
  showAssignee: boolean = false; // For showing assignee options
  userEmail: string | null = null;
  userName: string | null = null;
  userRole: string | null = null;
  showBox = false;
  showModal = false; // For modal visibility
  isEditMode: boolean = false;
  editingTaskIndex: number = -1;
  activeMenuId: number | null = null;
  tasks: Task[] | any; // Array to hold tasks
  newTask: Task = new Task(0, "", "", true, "Pending", "Medium", "", "", ""); // New task object
  totalTasks: number = 0;
  completedTasks: number = 0;
  inProgressTasks: number = 0;
  pendingTasks: number = 0;

  constructor(public auth: AuthService, private taskService: TaskService ) {}

  ngOnInit(): void {
    this.userName = this.auth.getUserEmail();
    this.userRole = this.auth.getUserRole();
    // this.taskService.getTasks().subscribe((tasks) => {
    //   this.tasks = tasks;
    // });

    const savedTasks = localStorage.getItem("tasks");
    this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
    console.log(this.tasks);
    this.calculateTaskCounts(); // ⬅️ Count task statuses
  }

  calculateTaskCounts(): void {
    this.totalTasks = this.tasks.length;
    this.completedTasks = this.tasks.filter(
      (task: Task) => task.status === "Completed"
    ).length;
    this.inProgressTasks = this.tasks.filter(
      (task: Task) => task.status === "In Progress"
    ).length;
    this.pendingTasks = this.tasks.filter(
      (task: Task) => task.status === "Pending"
    ).length;
  }
  openModal() {
    this.showModal = true; // Show the modal
  }

  closeModal() {
    this.showModal = false; // Hide the modal
    this.isEditMode = false;
    this.newTask = new Task(0, "", "", true, "Pending", "Medium", "", "");
  }

  getStatusClass(status: string) {
    return {
      "status-pending": status === "Pending",
      "status-in-progress": status === "In Progress",
      "status-completed": status === "Completed",
    };
  }

  getPriorityClass(priority: string) {
    return {
      "priority-low": priority === "Low",
      "priority-medium": priority === "Medium",
      "priority-high": priority === "High",
      "priority-urgent": priority === "Urgent",
    };
  }

  submitTask(event: Event) {
    event.preventDefault();

    if (this.isEditMode && this.editingTaskIndex !== -1) {
      this.tasks[this.editingTaskIndex] = { ...this.newTask };
    } else {
      this.newTask.sno = Date.now(); // Use timestamp as unique ID
      this.calculateTaskCounts();
      this.tasks.push({ ...this.newTask });
    }
    // this.taskService.createTask(this.newTask).subscribe((response) => {
    //   this.tasks.push(response.task); // Add new task to local array
    //   this.closeModal();
    //   this.newTask = new Task(); 
      
    // });

    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    this.closeModal();

    // this.tasks.push(this.newTask);
    // this.newTask.sno = this.tasks.length + 1;
    // this.calculateTaskCounts();

    // localStorage.setItem("tasks", JSON.stringify(this.tasks));

    // console.log("Task submitted", this.newTask);
    // this.closeModal();
    // this.newTask = new Task(0, "", "", true, "", "", "", "");
    // this.showCreateTask = false;
  }

  editTask(task: Task) {
    console.log("Edit task clicked", task);
    this.isEditMode = true;
    this.editingTaskIndex = this.tasks.findIndex(
      (t: { sno: number }) => t.sno === task.sno
    );
    this.newTask = { ...task }; // clone to avoid live editing
    this.selectedTodo = { ...task };

    this.openModal();
  }
  deleteTask(task: Task) {
    console.log("Delete task clicked", task);
    const index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      this.calculateTaskCounts();
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
  // addTask(task: Task) {
  //   console.log("Add task clicked", task);
  //   if (!this.tasks) {
  //     this.tasks = [];
  //   }
  //   this.tasks.push(task);
  //   localStorage.setItem("tasks", JSON.stringify(this.tasks));
  //   console.log("Task added");
  // }
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
  toggleMenu(event: MouseEvent, sno: number) {
    event.stopPropagation(); // Prevent the click from propagating to the document

    this.activeMenuId = this.activeMenuId === sno ? null : sno;
    console.log("Toggle menu clicked for task ID:", sno);
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
  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest(".popup-menu") && !target.closest(".menu-trigger")) {
      this.activeMenuId = null;
    }
  }

  @HostListener("document:mouseup")
  stopResize() {
    this.resizing = false;
  }
}
