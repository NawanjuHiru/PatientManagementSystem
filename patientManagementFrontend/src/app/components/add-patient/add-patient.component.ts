import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
  patientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      nic: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.patientForm.invalid) return;

    const formData = this.patientForm.value;

    this.patientService.addPatient(formData).subscribe({
      next: () => {
        this.snackBar.open('Patient added successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/patients']);
      },
      error: (err) => {
        this.snackBar.open('Failed to add patient. Try again.', 'Close', { duration: 3000 });
        console.error('Error adding patient:', err);
      }
    });
  }
}
