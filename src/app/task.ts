export class Task{
    title: string = "";
    status: string = "Pending"; // Added status field
    desc: string = "";
    priority: string = "Medium"; // Added priority field
    dueDate: string = ""; // Added date field
    assignedTo: string = ""; // Added assignedTo field
    active: boolean = false;

    constructor(title: string, desc: string, active: boolean, status: string = "Pending", priority: string = "Medium", dueDate: string = "", assignedTo: string = "") {
    
        this.title = title;
        this.desc = desc;
        this.active = active;
        this.status = status;
        this.priority = priority;
        this.dueDate = dueDate;
        this.assignedTo = assignedTo;
    }

}