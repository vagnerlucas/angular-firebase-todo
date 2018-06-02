export class TaskModel {
    desc: string;
    done: boolean;
    removed: boolean;
    timestamp: any;
    date: Date;
}

export class TaskModelId extends TaskModel {
    id: string;
}