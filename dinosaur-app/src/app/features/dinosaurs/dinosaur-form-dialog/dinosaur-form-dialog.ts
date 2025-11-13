import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../../shared/material.module';
import { Dinosaur } from '../../../core/models/dinosaur.model';

@Component({
  selector: 'app-dinosaur-form-dialog',
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './dinosaur-form-dialog.html',
  styleUrl: './dinosaur-form-dialog.scss',
})
export class DinosaurFormDialog implements OnInit {
  dinosaurForm!: FormGroup;
  isEditMode = false;
  dietOptions = ['Herbívoro', 'Carnívoro', 'Omnívoro'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DinosaurFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Dinosaur | null
  ) { }

  ngOnInit(): void {
    this.isEditMode = !!this.data;
    this.createForm();
    
    if (this.isEditMode && this.data) {
      this.dinosaurForm.patchValue(this.data);
    }
  }

  createForm(): void {
    this.dinosaurForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      species: ['', [Validators.required]],
      period: ['', [Validators.required]],
      diet: ['', [Validators.required]],
      length: [0, [Validators.required, Validators.min(0.1)]],
      weight: [0, [Validators.required, Validators.min(0.01)]],
      description: [''],
      imageUrl: ['', [Validators.pattern(/^https?:\/\/.+/)]]
    });
  }

  onSubmit(): void {
    if (this.dinosaurForm.valid) {
      this.dialogRef.close(this.dinosaurForm.value);
    } else {
      Object.keys(this.dinosaurForm.controls).forEach(key => {
        this.dinosaurForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getErrorMessage(fieldName: string): string {
    const control = this.dinosaurForm.get(fieldName);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('minLength')) {
      return `Mínimo ${control.errors?.['minLength'].requiredLength} caracteres`;
    }
    if (control?.hasError('min')) {
      return `El valor mínimo es ${control.errors?.['min'].min}`;
    }
    if (control?.hasError('pattern')) {
      return 'URL inválida (debe comenzar con http:// o https://)';
    }
    return '';
  }
}
