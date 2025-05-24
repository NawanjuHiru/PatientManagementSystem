export interface Patient {
  id: number;
  name: string;
  nic: string;
  dateOfBirth: Date; // ISO date string
  gender: 'Male' | 'Female' | 'Other';
}