import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Task } from '../../models/task.model';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})

// handles get all task by Id, create, view &|| update item
export class TaskComponent implements OnInit {
  task!: Task;
  isEdit!: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    this.taskService
      //ma
      .readOne(id)
      .subscribe((task: Task) => (this.task = task));

    // access the edit property
    this.isEdit = this.route.snapshot.data['isEdit'];
  }

  onCreate(task: Task) {
    this.taskService
      .create(task)
      .subscribe((task) => this.router.navigate(['app', 'tasks', task.id]));
  }

  onUpdate(task: Task) {
    this.taskService.update(task).subscribe({
      next: () => this.router.navigate(['app']),
      //next: () => console.log('updated successfully!'),
      error: (err) => console.log('OnUpdate error:', err),
    });
  }

  onDelete(task: Task) {
    this.taskService
      .delete(task)
      .subscribe(() => this.router.navigate(['app']));
  }

  // ngOnInit(): void {
  //   this.task = this.taskService.readOne(1);
  // }

  // after the form is submited it bubbles up to task-read-one via the event
  // onCreate(task: Task) {
  //   //console.log('onCreate', task);
  //   this.taskService
  //     .create(task)
  //     .subscribe(() => console.log('Created succesfully'));
  // }
  // onUpdate(task: Task) {
  //   console.log('onUpdate', task);
  //   this.taskService.update(task);
  // }

  // onDelete(task: Task) {
  //   this.taskService.delete(task);
  // }
}
