import { Component, OnInit } from '@angular/core';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from './services/employee.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'Crud 15';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService
  ) {}

  //title of the applicaiton
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'id',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  // A private injector for dialogue

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm() {
    const DialogRef = this.dialog.open(EmpAddEditComponent);
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  openEditForm(data: any) {
    const DialogRef = this.dialog.open(EmpAddEditComponent, {
      data,
    });

    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  //form function to enter new employees information
  addEmployee() {
    // using the add/edit component within the arguement
    this.dialog.open(EmpAddEditComponent);
  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Edit and Delete funtions

  deleteE(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted!', 'done');
        this.getEmployeeList();
      },
      error: console.log,
    });
  }
}
