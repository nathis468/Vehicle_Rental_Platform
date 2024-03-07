import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from '../interfaces/Users';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {

  constructor(private usersService: UsersService, private changeDetect: ChangeDetectorRef){}

  ngOnInit(){
    this.usersDetails(this.page,this.pageSize);
  }

  userDetails: any;

  page: number = 1;
  pageSize: number = 5;

  changeType(type: string ){
    this.userDetails(this.page,this.pageSize); 
  }


  displayedColumns :string[] = ["profilePic","userName", "email","contactNumber"];
  dataSource  = new MatTableDataSource<Users>() ;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngAfterViewInit() {
    this.changeDetect.detectChanges();
    
  }

  onPageChanges(event: PageEvent){
    this.page = event.pageIndex+ 1;
    this.pageSize = event.pageSize;
    console.log(this.page,this.pageSize);
    this.usersDetails(this.page,this.pageSize);
  }
    
  usersDetails(page: number,pageSize: number){
    this.usersService.getUserDetails(page,pageSize).subscribe({
      next: (response) => {
        console.log(response);
        
        this.paginatorProperties(response); 
      },
      error: (error) => {
        console.log(error);
        
      },
      complete: () => {       
      }
    })    
  }

  paginatorProperties(response) {
    this.dataSource.data = response.body.content;
    this.paginator.pageIndex = response.body.number;
    this.paginator.pageSize = response.body.size;
    this.paginator.length = response.body.totalElements;

    console.log(response.body);
    console.log(this.paginator);
  }


}

