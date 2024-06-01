import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

//containers
import { TaskListComponent } from './containers/task-list/task-list.component';
import { TaskComponent } from './containers/task/task.component';

// components
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskTemplateComponent } from './components/task-template/task-template.component';

//services

//directives

// lazy loading - the code is not included in the application bundle. the actual functionallity for lazy is in app-routing.module

export const routes: Routes = [
  // container handles read
  { path: 'tasks', component: TaskListComponent },

  //container handles create, cannot edit
  {
    path: 'tasks/addTask',
    component: TaskComponent,
    data: { isEdit: false },
  },
  // container handles view &|| update item
  {
    path: 'tasks/:id',
    component: TaskComponent,
    data: { isEdit: true },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tasks',
  },
];

@NgModule({
  declarations: [
    TaskListComponent,
    TaskTemplateComponent,
    TaskComponent,
    TaskFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    //HttpClientModule,
    RouterModule.forChild(routes),
  ],
  // exports: [TaskListComponent, TaskComponent],
})
export class DashboardModule {}
