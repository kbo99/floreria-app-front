import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true
  };

  public barChartLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
  'Julio', 'Agosto', 'Septiembre', 'Noviembre', 'Diciembre'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 70, 65, 59, 80, 81, 56], label: 'Venta A'},
    {data: [23, 45, 33, 45, 45, 45, 70, 65, 59, 80, 81, 56], label: 'Venta B'}

  ];
  public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';

  public radarChartLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
  public radarChartData = [
    {data: [120, 130, 180, 70], label: '2017'},
    {data: [90, 150, 200, 45], label: '2018'}
  ];
  public radarChartType = 'radar';

  public doughnutChartLabels = ['Sales Q1'];
  public doughnutChartData = [16,84];
  public doughnutChartType = 'doughnut';
  constructor() { }

  ngOnInit() {
  }

}
