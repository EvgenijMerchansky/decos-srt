import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-best',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'stat A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'stat B'}
  ];

  public doughnutChartLabels = ['stat Q1', 'stat Q2', 'stat Q3', 'stat Q4'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }
}
