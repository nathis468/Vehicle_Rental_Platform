import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from '../interfaces/Users';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2'
import { color } from 'highcharts';



@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {

  constructor(private usersService: UsersService, private changeDetect: ChangeDetectorRef) { }

  page: number = 1;
  pageSize: number = 5;
  active: string = '';
  direction: string = '';
  searchedValue: string = '';
  timer: any;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  sortableSubscription: Subscription = new Subscription();
  userDetailsSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.usersDetails(this.page, this.pageSize, this.searchedValue, this.active, this.direction);
  }

  ngAfterViewInit() {
    this.changeDetect.detectChanges();

    this.sortableSubscription = this.sort.sortChange.subscribe({
      next: (data: Sort) => {
        this.active = data.active;
        this.direction = data.direction;
        this.usersDetails(this.page, this.pageSize, this.searchedValue, data.active, data.direction);
      }
    })
  }


  onFiltering(event: Event) {
    this.searchedValue = (event.target as HTMLInputElement).value;
    if (event.type === 'click') {
      this.usersDetails(this.page, this.pageSize, this.searchedValue, this.active, this.direction);
    }
    else {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.usersDetails(this.page, this.pageSize, this.searchedValue, this.active, this.direction);
      }, 1000)
    }
  }

  displayedColumns: string[] = ["profilePic", "userName", "email", "contactNumber", "role", "permission"];
  dataSource = new MatTableDataSource<Users>();

  onPageChanges(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.usersDetails(this.page, this.pageSize, this.searchedValue, this.active, this.direction);
  }

  usersDetails(page: number, pageSize: number, searchedValue: string, active: string, direction: string) {
    this.userDetailsSubscription = this.usersService.getUserDetails(page, pageSize, searchedValue, active, direction).subscribe({
      next: (response) => {
        this.paginatorProperties(response);
      }
    })
  }

  paginatorProperties(response) {
    this.dataSource.data = response.body.content;
    this.paginator.pageIndex = response.body.number;
    this.paginator.pageSize = response.body.size;
    this.paginator.length = response.body.totalElements;
  }

  assignAccess(user: Users) {
    user.role = "FLEET_MANAGER";
    console.log(user);
    
    this.usersService.updateUser(user).subscribe({
      next: () => {
        Swal.fire({
          text: "Role Updated Successfully",
          confirmButtonColor: '#545ff0'
        });
      }
    })
  }

  ngOnDestroy() {
    this.sortableSubscription.unsubscribe();
    this.userDetailsSubscription.unsubscribe();
  }
}

