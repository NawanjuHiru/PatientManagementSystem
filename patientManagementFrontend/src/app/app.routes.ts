import { Routes } from '@angular/router';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';

export const routes: Routes = [
  { path: '', redirectTo: 'patients', pathMatch: 'full' },
  { path: 'patients', component: PatientListComponent },
  { path: 'add-patient', component: AddPatientComponent },
  { path: '**', redirectTo: 'patients' }
];
