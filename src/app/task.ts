export class Task{
    sno: number = 0;
    title: string = "";
    status: string = ""; // Added status field
    desc: string = "";
    priority: string = "Pending"; // Added priority field
    dueDate: string = ""; // Added date field
    assignedTo: string = ""; // Added assignedTo field
    active: boolean = false;

    constructor(sno: number, title: string, desc: string, active: boolean, status: string = "Pending", priority: string = "Medium", dueDate: string = "", assignedTo: string = "") {
        this.sno = sno;
        this.title = title;
        this.desc = desc;
        this.active = active;
        this.status = status;
        this.priority = priority;
        this.dueDate = dueDate;
        this.assignedTo = assignedTo;
    }

}