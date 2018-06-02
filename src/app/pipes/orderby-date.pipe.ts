import { Pipe, PipeTransform } from '@angular/core';
import { TaskModelId } from '../models/TaskModel';
import { Observable } from 'rxjs';

@Pipe({
  name: 'orderByDate'
})

export class OrderByDatePipe implements PipeTransform {

  transform(tasks: TaskModelId[]): TaskModelId[] {
    if (tasks != null) {
      tasks.sort((a: TaskModelId, b: TaskModelId) => {
        return a.date.valueOf() - b.date.valueOf();
      });

      return tasks;
    }
  }
}
