import { Component, OnInit, HostListener } from "@angular/core";
import { AuthService } from "../auth.service";
import { Task } from "../task";

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
  tasks: Task[] = []; // Initialize tasks array

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.userName = this.auth.getUserEmail();
    this.userRole = this.auth.getUserRole();

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

    //   const newTask = {
    //     title: (document.getElementById("taskTitle") as HTMLInputElement).value,
    //     description: (
    //       document.getElementById("taskDescription") as HTMLTextAreaElement
    //     ).value,
    //     status: (
    //       document.getElementById("taskStatus") as HTMLSelectElement
    //     ).value.toLowerCase(),
    //     priority: (
    //       document.getElementById("taskPriority") as HTMLSelectElement
    //     ).value.toLowerCase(),
    //     assignee: (document.getElementById("taskAssignee") as HTMLInputElement)
    //       .value,
    //     dueDate: new Date(
    //       (document.getElementById("taskDueDate") as HTMLInputElement).value
    //     ).toDateString(),
    //     author: "Admin User",
    //   };
    //   console.log("Task Created:", newTask);
    //   closeModal();
    //   form.reset();
    // });
  }
  openModal() {
    const modelDiv= document.getElementById("createTaskModal");
    if (modelDiv) {
      modelDiv.style.display = "block";
    }
  }
  closeModal() {
    const modelDiv = document.getElementById("createTaskModal");
    if (modelDiv) {
      modelDiv.style.display = "none";
    }
  }
  threeDots(){
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
      let pixels = (this.leftWidth / 100) *  window.innerWidth;

      const direction = currentX > pixels ? "right" : "left";
      //dragArea.textContent = `Dragging ${direction}`;
      console.log(this.leftWidth, direction, currentX);
      if (this.leftWidth < 26 && direction=="left") return;
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
