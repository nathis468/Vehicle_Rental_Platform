import { Component } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';
import { VehiclesService } from '../services/vehicles.service';
import { SalesOverTime } from '../interfaces/SalesOverTime';
import { Chart } from 'angular-highcharts';
import { TopRatings } from '../interfaces/TopRatings';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent {

  constructor(private analyticsService: AnalyticsService, private vehiclesService: VehiclesService) {}

  options : string[];

  selectedOption: string;

  assignOption(value: string) {
    this.selectedOption = value;
    this.onSelectChange();  
  }

  ngOnInit() {
    this.onSelectBefore(); 
    this.customerRatingTopCalc();   
  }

  onSelectBefore() {
    this.vehiclesService.getTotalCarDetails().subscribe({
      next: (response) => {
        this.options = response.body;
      },
    }) 
  }

  salesOverTime: SalesOverTime[];

  onSelectChange(){
    this.analyticsService.yearlyAnalytics(this.selectedOption).subscribe({
      next: (response) => {
        this.salesOverTime = response.body;
      },
    }) 
  }



  // eventFromRating(event: string) {
  // }


  customerRatingTop: TopRatings[];

  customerRatingTopCalc() {
    
    this.analyticsService.topRating('top').subscribe({
      next: (response) => {
        console.log(response);
        this.customerRatingTop = response.body;
      },
      error: (error) => {
        console.log("error",error);
      },
      complete: () => {
        this.customerRatingBelowCalc();
      }
    })
  }

  customerRatingBelow: TopRatings[];

  customerRatingBelowCalc() {
    
    this.analyticsService.topRating('below').subscribe({
      next: (response) => {
        console.log(response);
        this.customerRatingBelow = response.body;
      },
      error: (error) => {
        console.log("error",error);
      }
    })
  }

}
