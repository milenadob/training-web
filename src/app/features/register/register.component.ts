import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  minDate: Date;
  maxDate: Date;

  constructor() {
    const currentDate = new Date();
    this.minDate = new Date(currentDate.getFullYear() - 120, currentDate.getMonth(), currentDate.getDay());
    this.maxDate = new Date(currentDate.getFullYear() - 14, currentDate.getMonth(), currentDate.getDay());
   }

  ngOnInit(): void {
  }

}
