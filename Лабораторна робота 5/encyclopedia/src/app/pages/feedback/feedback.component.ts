import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-feedback',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent {
  feedbackForm: FormGroup;
  showTooltip = false;

  constructor(private fb: FormBuilder) {
    this.feedbackForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(5), Validators.max(120)]],
      education: ['', Validators.required],
      purpose: ['', Validators.required],
      details: ['', [Validators.required, Validators.maxLength(500)]],
      consent: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.feedbackForm.invalid) {
      this.feedbackForm.markAllAsTouched();
      alert('Будь ласка, заповніть усі обов’язкові поля.');
      return;
    }

    console.log('Форма відправлена:', this.feedbackForm.value);
    alert('Дякуємо! Ваш відгук успішно відправлено.');

    this.feedbackForm.reset();
  }

  get f() {
    return this.feedbackForm.controls as {
      fullname: FormControl;
      email: FormControl;
      age: FormControl;
      education: FormControl;
      purpose: FormControl;
      details: FormControl;
      consent: FormControl;
    };
  }

}
