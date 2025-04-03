import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">Solar Management System</a>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .navbar {
      margin-bottom: 20px;
    }
  `]
})
export class AppComponent {
  title = 'Solar Management System';
}