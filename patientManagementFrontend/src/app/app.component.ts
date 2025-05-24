import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatSnackBarModule, MatButtonModule],
  template: `
  <mat-toolbar color="primary" class="custom-toolbar">
      <span class="app-title" [routerLink]="['/']">Patient Management System</span>
      <span class="spacer"></span>
      <div class="nav-buttons">
        <button routerLink="/patients" mat-button class="green-button">Patient List</button>
        <button routerLink="/add-patient" mat-button class="green-button">Add Patient</button>
      </div>
    </mat-toolbar>
    
    <router-outlet></router-outlet>
  `,
  styles: [`
    .custom-toolbar {
      background-color:rgb(127, 164, 243);
      padding: 0 24px;
      display: flex;
      align-items: center;
    }

    .app-title {
      font-size: 22px;
      font-weight: bold;
      color: rgb(18, 21, 92);
      cursor: pointer;
      text-decoration: none;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .nav-buttons {
      color: white;
      display: flex;
      gap: 12px;
    }

    .green-button {
      color: rgb(255, 255, 255);
      background-color: rgb(18, 21, 92);
      font-weight: 500;
      border-radius: 4px;
    }

    .green-button:hover {
      background-color: rgb(18, 21, 92);
    }
  `]
})
export class AppComponent {}
