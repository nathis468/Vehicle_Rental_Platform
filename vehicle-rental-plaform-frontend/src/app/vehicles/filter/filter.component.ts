import { formatDate } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class    FilterComponent {
  filterDetails: FormGroup;
  
  @Output() addFilter = new EventEmitter<FormGroup>();
  
  ngOnInit() {
    this.filterDetails = new FormGroup({
      latitude: new FormControl<string>(''),
      longitude: new FormControl<string>(''),
      startDate: new FormControl<string>(formatDate(new Date(), 'yyyy-MM-dd', 'en')),
      endDate: new FormControl<string>(formatDate(new Date(), 'yyyy-MM-dd', 'en'))
    })
    this.addFilter.emit(this.filterDetails);
  }


  onSubmit(){
    this.addFilter.emit(this.filterDetails);
  }

}
