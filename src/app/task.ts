export class Task{
    sno: number = 0; // Added sno field for unique identification
    title: string = "";
    status: string = "Pending"; // Added status field
    desc: string = "";
    priority: string = "Medium"; // Added priority field
    dueDate: string = ""; // Added date field
    assignee: string = ""; // Added assignedTo field
    active: boolean = false;

    constructor(sno: number, title: string, desc: string, active: boolean, status: string = "Pending", priority: string = "Medium", dueDate: string = "", assignee: string = "") {
        this.sno = sno;
        this.title = title;
        this.desc = desc;
        this.active = active;
        this.status = status;
        this.priority = priority;
        this.dueDate = dueDate;
        this.assignee = assignee;
    }

}