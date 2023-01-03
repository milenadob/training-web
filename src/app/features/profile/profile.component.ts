import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserUpdate } from 'src/app/core/model/user-update';
import { UserView } from 'src/app/core/model/user-view';
import { LocalService } from 'src/app/core/services/local-serivce';
import { UsersService } from 'src/app/core/services/users-service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  minDate: Date;
  maxDate: Date;

  success = false;
  alert = false;
  alertMessage = "";

  updateForm = this.fb.group({
    username: [''],
    password: [''],
    height: ['', Validators.required],
    weight: ['', Validators.required],
    sex: ['', Validators.required],
    birthday: ['', Validators.required],
  });

  ngOnInit(): void {
    if (this.localService.getData("username") == null)
      this.router.navigate(['/login']);

    this.updateForm.controls.username.setValue(this.localService.getData("username"));

    this.usersService.get(this.localService.getData("username") as string).subscribe({
      next: (value: UserView) => this.updateData(value),
      error: () => this.router.navigate(['/login']),
      complete: () => { }
    })
  }

  constructor(private fb: FormBuilder,  private usersService: UsersService, private router: Router,
    private localService: LocalService, public dialog: MatDialog) { 
    const currentDate = new Date();
    this.minDate = new Date(currentDate.getFullYear() - 120, currentDate.getMonth(), currentDate.getDay());
    this.maxDate = new Date(currentDate.getFullYear() - 14, currentDate.getMonth(), currentDate.getDay());
   }

  onSubmit(): void {
    if (this.updateForm.status == 'VALID') {

      this.usersService.update(
        new UserUpdate(
          Number(this.updateForm.value.height),
          Number(this.updateForm.value.weight),
          this.updateForm.value.sex as string,
          this.updateForm.value.birthday as string),
        this.updateForm.value.username as string)
        .subscribe(
          {
            next: (value: UserView) => {
              this.updateData(value);
              this.success = true;
            },
            error: (error: any) => { 
              this.alert = true;
              this.alertMessage = error.error;
            },
            complete: () => { }
          }
        );
    }
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if( result == true) {
        this.usersService.delete(this.localService.getData("username") as string).subscribe({
          next: () => this.router.navigate(['/login']),
          error: (error: any) => { 
            this.alert = true;
            this.alertMessage = error.error;
          },
          complete: () => { }
        })
      }
    });
  }

  private updateData(value: UserView): void {
    this.updateForm.controls.username.setValue(value.username);
    this.updateForm.controls.sex.setValue(value.sex);
    this.updateForm.controls.weight.setValue(`${value.weight}`);
    this.updateForm.controls.height.setValue(`${value.height}`);
    this.updateForm.controls.birthday.setValue(value.birthday);
  }

}
