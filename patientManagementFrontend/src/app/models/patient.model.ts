export interface Patient {
  id: number;
  name: string;
  nic: string;
  dateOfBirth: Date; 
  gender: 'Male' | 'Female' | 'Other';
}