import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators,  } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/model/user';
import { UsersService } from 'src/app/core/services/users-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  minDate: Date;
  maxDate: Date;

  alert = false;
  alertMessage = "";

  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.compose([
      Validators.required,
      Validators.minLength(6)]
    )],
    height: ['', Validators.required],
    weight: ['', Validators.required],
    sex: ['', Validators.required],
    birthday: ['', Validators.required],
  });

  ngOnInit(): void {
  }

  constructor(private fb: FormBuilder,  private usersService: UsersService, private router: Router) { 
    const currentDate = new Date();
    this.minDate = new Date(currentDate.getFullYear() - 120, currentDate.getMonth(), currentDate.getDay());
    this.maxDate = new Date(currentDate.getFullYear() - 14, currentDate.getMonth(), currentDate.getDay());
   }

   onSubmit(): void {
    if (this.registerForm.status == 'VALID') {

      this.usersService.register(
        new User(this.registerForm.value.username as string, 
          this.registerForm.value.password as string,
          Number(this.registerForm.value.height),
          Number(this.registerForm.value.weight),
          this.registerForm.value.sex as string,
          this.registerForm.value.birthday as string))
        .subscribe(
          () => {
            this.router.navigate(['/login'], { queryParams: { register: 'true' } }); 
          },
          (error: any) => {
            console.log(error)
            this.alert = true;
            this.alertMessage = error.error;
          })
    }
  }

}