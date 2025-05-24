import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule,
    MatTableModule
  ],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'] // you can create a blank .scss file to fix the warning
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];
  displayedColumns: string[] = ['id', 'name', 'nic', 'dateOfBirth', 'gender', 'actions'];
  loading: boolean = false;
  error: string = '';

  constructor(
    private patientService: PatientService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.loading = true;
    this.error = '';
    this.patientService.getPatients().subscribe({
      next: (data: Patient[]) => {
        this.patients = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading patients', err);
        this.error = 'Failed to load patients.';
        this.loading = false;
      }
    });
  }

  getPatientById(id: number): void {
  this.patientService.getPatientById(id).subscribe({
    next: (patient) => {
      alert(
        `Patient Info:\n\nName: ${patient.name}\nNIC: ${patient.nic}\nDOB: ${patient.dateOfBirth}\nGender: ${patient.gender}`
      );
    },
    error: (err) => {
      this.snackBar.open('Failed to load patient details.', 'Close', { duration: 3000 });
      console.error('Failed to load patient:', err);
      alert('Patient not found or error fetching data.');
    }
  });
}

  deletePatient(id: number): void {
  this.patientService.deletePatient(id).subscribe({
    next: () => {
      this.snackBar.open('Patient deleted successfully!', 'Close', { duration: 3000 });
      this.loadPatients();  // Refresh list if you have a load method
    },
    error: () => {
      this.snackBar.open('Failed to delete patient.', 'Close', { duration: 3000 });
    }
  });
}
}
