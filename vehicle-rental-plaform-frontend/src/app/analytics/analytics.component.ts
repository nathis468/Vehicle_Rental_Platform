import { Component } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';
import { VehiclesService } from '../services/vehicles.service';
import { SalesOverTime } from '../interfaces/SalesOverTime';
import { TopRatings } from '../interfaces/TopRatings';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent {

  constructor(private analyticsService: AnalyticsService, private vehiclesService: VehiclesService) {}

  options : string[] = [];

  selectedOption: string = 'Honda City';

  totalCarSubcription: Subscription;
  yearlyAnalyticsSubscription: Subscription;
  topRatingSubscription: Subscription;
  belowRatingSubsciption: Subscription;

  assignOption(value: string) {
    this.selectedOption = value;
    this.onSelectChange();  
  }

  ngOnInit() {
    this.onSelectBefore(); 
    this.onSelectChange();
    this.customerRatingTopCalc();   
  }

  onSelectBefore() {
    this.totalCarSubcription = this.vehiclesService.getTotalCarDetails().subscribe({
      next: (response) => {
        this.options = response.body;
      },
    }) 
  }

  salesOverTime: SalesOverTime[];

  onSelectChange(){
    this.yearlyAnalyticsSubscription = this.analyticsService.yearlyAnalytics(this.selectedOption).subscribe({
      next: (response) => {
        this.salesOverTime = response.body;
      },
    }) 
  }

  customerRatingTop: TopRatings[];

  customerRatingTopCalc() {
    
    this.topRatingSubscription = this.analyticsService.rating('top').subscribe({
      next: (response) => {
        this.customerRatingTop = response.body;
      },
      complete: () => {
        this.customerRatingBelowCalc();
      }
    })
  }

  customerRatingBelow: TopRatings[];

  customerRatingBelowCalc() {
    this.belowRatingSubsciption = this.analyticsService.rating('below').subscribe({
      next: (response) => {
        this.customerRatingBelow = response.body;
      }
    })
  }

  ngOnDestroy() {
    this.totalCarSubcription.unsubscribe();
    this.yearlyAnalyticsSubscription.unsubscribe();
    this.topRatingSubscription.unsubscribe();
    this.belowRatingSubsciption.unsubscribe();
  }
}
