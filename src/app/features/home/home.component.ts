import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/core/services/local-serivce';
import { TrainingService } from 'src/app/core/services/trainings-service';
import { MatTableDataSource } from '@angular/material/table';
import { Training } from 'src/app/core/model/training';
import { TrainingUpdate } from 'src/app/core/model/training-update';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns = ['startDateTime', 'endDateTime', 'duration', 'distance', 'additionalInfo', 'edit'];
  dataSource: MatTableDataSource<Training>;

  username: string | null = "";

  constructor(private router: Router, private localService: LocalService, private trainingService: TrainingService) {
    this.username = this.localService.getData("username");
    console.log(this.username);

    if (this.username == null) {
      this.router.navigate(['/login']);
    }
    
    this.reload();
  }

  convertMsToTime (milliseconds: number): string {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
  
    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;
  
    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  }

  convertDatetime (dateString: string): string {
    const date = new Date(dateString)
    return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
  }

  ngOnInit(): void {
    
  }

  reload(): void {

    this.trainingService.getAllTrainings(this.username as string).subscribe(trainings => {
      this.dataSource = new MatTableDataSource(trainings);
      console.log(trainings)
      trainings.forEach(training => {
        training.isEdit = false;
      });
    }
  )
  }

  save(element: Training): void {
    this.trainingService.update(new TrainingUpdate(element.additionalInfo), element.id)
    .subscribe({
      next: () => element.isEdit = false,
      error: () => { },
      complete: () => { }
    });
  }

  delete(element: Training): void {
    this.trainingService.delete(element.id)
    .subscribe({
      next: () => this.reload(),
      error: () => { },
      complete: () => { }
    });
  }

}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

