
import { Component, OnInit } from '@angular/core';
// import بنضيف هاي ال
import Chart from 'chart.js/auto';
import { AdminService } from 'src/app/Services/admin.service';
import { HomeService } from 'src/app/Services/home.service';
import * as html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  constructor(public admin: AdminService) {
  }

  ngOnInit(): void {
    this.admin.getStatistics();
    console.log(this.admin.statistics);
    this.admin.ChartsFun();
  }

  download() {

    var element = document.getElementById('table');

    var opt = {

      margin: 1.5,

      filename: 'HNSs Charts.pdf',

      image: { type: 'jpeg', quality: 0.98 },

      html2canvas: { scale: 2 },

      jsPDF: { unit: 'cm', format: 'a2', orientation: 'landscape' }

    };



    // New Promise-based usage:

    html2pdf().from(element).set(opt).save();

  }


}
