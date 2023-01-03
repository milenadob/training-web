import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/core/model/user-login';
import { UsersService } from 'src/app/core/services/users-service';
import { LocalService } from '../../core/services/local-serivce';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  HOME_URL = '/home';
  alert = false;

  loginForm = this.fb.group(({
    username: ['', Validators.required],
    password: ['', Validators.required]
  }));


  constructor(private fb: FormBuilder, private router: Router, private usersService: UsersService,
    private localService: LocalService) {  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.loginForm.status == 'VALID') {

      this.usersService.login(new UserLogin(this.loginForm.value.username as string, 
        this.loginForm.value.password as string))
        .subscribe(res => {
          this.localService.saveData('authorization', res.headers.get('authorization'));
          this.localService.saveData('username', this.loginForm.value.username as string);
          this.router.navigate([this.HOME_URL]); 
        })
    }
  }
}
