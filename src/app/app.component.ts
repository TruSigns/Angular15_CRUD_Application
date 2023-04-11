import { Component } from '@angular/core';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //title of the applicaiton
  title: string = 'crud-app';

  // A private injector for dialogue
  constructor(private dialog: MatDialog) {}

  //form function to enter new employees information
  addEmployee() {
    // using the add/edit component within the arguement
    this.dialog.open(EmpAddEditComponent);
  }
}
