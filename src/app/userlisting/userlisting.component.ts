import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css'],
})
export class UserlistingComponent {
  displayedColumns: string[] = [
    'username',
    'name',
    'email',
    'role',
    'status',
    'action',
  ];

  constructor(private service: AuthService, private dialog: MatDialog) {
    this.loadUser();
  }

  userlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loadUser() {
    this.service.getAllUsers().subscribe((res) => {
      this.userlist = res;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  updateUser(id: any) {
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        usercode: id,
      },
    });
    popup.afterClosed().subscribe((res) => {
      this.loadUser();
    });
  }

  openDialog() {}
}
