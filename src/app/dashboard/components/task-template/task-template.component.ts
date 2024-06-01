import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-template',
  templateUrl: './task-template.component.html',
  styleUrls: ['./task-template.component.css'],
})

//view &|| update item
export class TaskTemplateComponent {
  @Input() task!: Task;
  @Input() isEdit!: boolean;

  // bubble up the event to task
  // emitting a type of Task
  @Output() create = new EventEmitter<Task>();
  @Output() update = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();

  constructor() {}

  /**
   *  Logic:
   *    1. user completes form
   *    2. if form is valid an event will push up the form from task-form into task-list container.
   */

  handleCreate(form: NgForm) {
    if (form.valid) {
      console.log(form.value);
      this.create.emit(form.value);
    } else {
      form.form.markAllAsTouched();
    }
  }

  handleUpdate(form: NgForm) {
    if (form.valid) {
      console.log(form.value);
      this.update.emit({ id: this.task.id, ...form.value });
    } else {
      form.form.markAllAsTouched();
    }
  }

  handleDelete() {
    if (confirm(`Task ${this.task.title} is completed?`)) {
      this.delete.emit({ ...this.task });
    }
  }
}
