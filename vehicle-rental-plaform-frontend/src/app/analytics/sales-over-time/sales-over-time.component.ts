import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { SalesOverTime } from 'src/app/interfaces/SalesOverTime';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-sales-over-time',
  templateUrl: './sales-over-time.component.html',
  styleUrls: ['./sales-over-time.component.css']
})
export class SalesOverTimeComponent {
  constructor(private analyticsService: AnalyticsService, private vehiclesService: VehiclesService) { }

  @Output() salesOverTimeEmitter = new EventEmitter<string>();
  selectedOption: string = 'Honda City';

  @Input() options: string[];

  @Input() chartAnalytics:SalesOverTime[];
  
  chart: Chart;

  onSelectChange(){
    this.salesOverTimeEmitter.emit(this.selectedOption);
  }


  ngOnInit() {
    this.onSelectChange();
  }

  ngOnChanges(){
    this.salesOverTimeChart();
  }

  salesOverTimeChart(){
    this.chart = new Chart({
      chart: {
        type: 'line',
        height: 325
      },
      title: {
        text: 'Month wise sales'
      },
      xAxis: {
        title: {
          text: `${this.selectedOption}`
        },
        categories: this.chartAnalytics.map(item => item.month.substring(0, 3))
      },
      yAxis: {
        title: {
          text: 'Revenue in $'
        }
      },
      series: [
        {
          name: 'Monthly Income',
          type: 'line',
          color: '#044342',
          data: this.chartAnalytics.map(item => item.income)
        }
      ],
      credits: {
        enabled: false
      }
    });

  }
}
