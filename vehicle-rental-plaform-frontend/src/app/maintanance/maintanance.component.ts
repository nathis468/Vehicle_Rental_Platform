import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Maintanance } from '../interfaces/Maintanance';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MaintananceService } from '../services/maintanance.service';
import { DamageComponent } from './damage/damage.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-maintanance',
  templateUrl: './maintanance.component.html',
  styleUrls: ['./maintanance.component.css']
})
export class MaintananceComponent {
  maintanance: any;

  constructor(private changeDetect: ChangeDetectorRef, private maintananceService: MaintananceService, private dialog: MatDialog) {}

  page = 1;
  pageSize = 5;
  type: string = "damage";  

  changeType(type: any){

    if(type.index == 0){
      this.type = 'damage';
    }
    else{
      this.type = 'service';
    }
    
    this.maintananceDetails(this.page,this.pageSize); 
  }

  displayedColumns :string[] = ["carModelName","serviceDate","price","description","image","status"];
  dataSource  = new MatTableDataSource<Maintanance>() ;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(){
    this.maintananceDetails(this.page,this.pageSize);
  }


  ngAfterViewInit() {
    this.changeDetect.detectChanges();
  }

  onPageChanges(event: PageEvent){
    this.page = event.pageIndex+ 1;
    this.pageSize = event.pageSize;
    console.log(this.page,this.pageSize);
    this.maintananceDetails(this.page,this.pageSize);
  }
    
  maintananceDetails(page,pageSize){
    this.maintananceService.getDetails(page,pageSize,this.type).subscribe({
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


  addNewService() {
    this.dialog.open(DamageComponent, {data: {type: this.type}, height: "750px", width: "600px"});
  }    


  statusChange(element) {
    element.status = 'completed'
    console.log(element);
    
    this.maintananceService.changeDetails(element).subscribe({
      next: () => {

      }
    })
  }
}
