import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalService } from '../../core/services/local-serivce';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group(({
    username: ['', Validators.required],
    password: ['', Validators.required]
  }));


  constructor(private fb: FormBuilder, private router: Router, private localService: LocalService) {  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.loginForm.status == 'VALID') {
      this.localService.saveData("username", this.loginForm.value.username as string)
      this.router.navigate(['/home']); 
    }
  }

}
