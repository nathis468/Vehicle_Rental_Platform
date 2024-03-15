import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { TopRatings } from 'src/app/interfaces/TopRatings';

@Component({
  selector: 'app-customer-rating-distribution',
  templateUrl: './customer-rating-distribution.component.html',
  styleUrls: ['./customer-rating-distribution.component.css']
})
export class CustomerRatingDistributionComponent {

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartAnalyticsTop'] && changes['chartAnalyticsTop'].currentValue) {
      this.topRating();
    }
    if (changes['chartAnalyticsBelow'] && changes['chartAnalyticsBelow'].currentValue) {
      this.belowRating();
    }
  }

  @Input() chartAnalyticsTop: TopRatings[];

  chartTop: Chart;
  topRating() {
    this.chartTop = new Chart({
      chart: {
        type: 'line',
        height: 325
      },
      title: {
        text: 'Top 10 Rated Vehicles'
      },
      xAxis: {
        title: {
          text: `Top 10 customer rated Vehicles`
        },
        categories: this.chartAnalyticsTop.map(item => item.carModelName)
      },
      yAxis: {
        title: {
          text: 'Rating from 1 to 5'
        }
      },
      series: [
        {
          name: 'Vehicles',
          type: 'column',
          color: '#044342',
          data: this.chartAnalyticsTop.map(item => item.rating)
        }
      ],
      credits: {
        enabled: false
      }
    });
  }



  @Input() chartAnalyticsBelow: TopRatings[];

  chartBelow: Chart;

  belowRating() {
    this.chartBelow = new Chart({
      chart: {
        type: 'line',
        height: 325
      },
      title: {
        text: 'Below 10 Rated Vehicles'
      },
      xAxis: {
        title: {
          text: `Below 10 customer rated Vehicles`
        },
        categories: this.chartAnalyticsBelow.map(item => item.carModelName)
      },
      yAxis: {
        title: {
          text: 'Rating from 1 to 5'
        }
      },
      series: [
        {
          name: 'Vehicles',
          type: 'column',
          color: '#044342',
          data: this.chartAnalyticsBelow.map(item => item.rating)
        }
      ],
      credits: {
        enabled: false
      }
    });

  }
}
