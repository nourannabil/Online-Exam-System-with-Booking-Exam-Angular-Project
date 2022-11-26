
import { Component, OnInit } from '@angular/core';
// import بنضيف هاي ال
import Chart from 'chart.js/auto';
import { AdminService } from 'src/app/Services/admin.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  constructor(public admin:AdminService) {
    
   }

  ngOnInit(): void {
    debugger
    this.admin.getStatistics();
    console.log(this.admin.statistics);
  this.admin.ChartsFun();

  }

  
}