import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';

import { AppComponent } from './app.component';
import { UserentryComponent } from './userentry/userentry.component';
import { RegisterComponent } from './register/register.component';
import { TodosComponent } from './todos/todos.component';
import { HomeComponent } from './home/home.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { MemberDashComponent } from './member-dash/member-dash.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: UserentryComponent },
      { path: 'admin-dash', component: AdminDashComponent },
      { path: 'member-dash', component: MemberDashComponent }
    ]
  },
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      { path: 'profile', component: AppComponent },
      { path: 'tasks', component: TodosComponent }
      // Add more secure routes here
    ]
  },
  { path: '**', redirectTo: '' } // catch all
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
