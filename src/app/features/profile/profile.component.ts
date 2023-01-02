import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  minDate: Date;
  maxDate: Date;

  updateForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    height: ['', Validators.required],
    weight: ['', Validators.required],
    sex: ['', Validators.required],
    birthday: ['', Validators.required],
  });

  ngOnInit(): void {
  }

  constructor(private fb: FormBuilder, private router: Router) { 
    const currentDate = new Date();
    this.minDate = new Date(currentDate.getFullYear() - 120, currentDate.getMonth(), currentDate.getDay());
    this.maxDate = new Date(currentDate.getFullYear() - 14, currentDate.getMonth(), currentDate.getDay());
   }

  onSubmit(): void {
    console.log("XDDD");
    this.router.navigate(['/home']);
  }

}
