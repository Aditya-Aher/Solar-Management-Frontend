import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VisitorFormComponent } from './components/visitor-form/visitor-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-visitor', component: VisitorFormComponent },
  { path: 'edit-visitor/:id', component: VisitorFormComponent },
  { path: 'view-visitor/:id', component: VisitorFormComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    VisitorFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }