import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators,  } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  minDate: Date;
  maxDate: Date;

  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    height: ['', Validators.required],
    weight: ['', Validators.required],
    sex: ['', Validators.required],
    birthday: ['', Validators.required],
  });

  ngOnInit(): void {
  }

  constructor(private fb: FormBuilder) { 
    const currentDate = new Date();
    this.minDate = new Date(currentDate.getFullYear() - 120, currentDate.getMonth(), currentDate.getDay());
    this.maxDate = new Date(currentDate.getFullYear() - 14, currentDate.getMonth(), currentDate.getDay());
   }

  onSubmit(): void {
    console.log("XDDD")
  }

}