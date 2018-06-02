import { Pipe, PipeTransform } from '@angular/core';
import { TaskModelId } from '../models/TaskModel';

@Pipe({
  name: 'filterTask'
})
export class FilterTaskPipe implements PipeTransform {

  transform(tasks: TaskModelId[], desc: string): TaskModelId[] {
    if (tasks != null) {
      tasks.sort((a: TaskModelId, b: TaskModelId) => {
        return a.date.valueOf() - b.date.valueOf();
      });

      if (desc && desc !== '') {
        desc = desc.toLowerCase();

        return tasks.filter(it => {
          return it.desc.toLowerCase().includes(desc);
        });
      }
      
      return tasks;
    }
  }

}
