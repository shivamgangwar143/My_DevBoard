import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private apiUrl = "http://localhost:3000/tasks"; // Your backend task route

  constructor(private http: HttpClient) {}

  // Get all tasks
  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Create new task
  createTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }

  // Update task
  updateTask(id: string, task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, task);
  }

  // Delete task
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
