import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks!: Task[];
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // subscribe() is basically asks for the data when it is ready. we can think as the 'then()' with the Promise.

    // if there is no data, then the read function is called and activates the get req.
    // if there is data, then we subscribe to it directly using rxjs observable 'of' in task.service
    this.taskService.read().subscribe((tasks: Task[]) => (this.tasks = tasks)); //(assign the value of this.tasks to tasks);
  }

  trackById(index: number, value: Task) {
    console.log(index, value);
    return value.id;
  }
}
