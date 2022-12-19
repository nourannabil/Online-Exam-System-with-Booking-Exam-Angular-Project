import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import * as html2pdf from 'html2pdf.js';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  dateFrom?: string = '';
  dateTo?: string = '';
  year?:string = '';

  searchText = '';
  constructor(public admin: AdminService,private dialog:MatDialog) { }


  ngOnInit(): void {
    this.admin.getAllBooking();
    this.admin.getAllExams();
    this.admin.getAllStatus();
    this.admin.GetAllUsers();
    this.admin.getStatistics();
  }


  //===============Search Functions====================

  searchDateFrom(ev: any) {
    this.dateFrom = ev.target.value
    console.log(ev.target.value);
  }
  searchDateTo(ev: any) {
    this.dateTo = ev.target.value
    console.log(ev.target.value);
  }
  searchYear(ev: any) {
    this.year = ev.target.value
    console.log(ev.target.value);
  }
  submit() {
    if ((this.dateFrom == '') && (this.dateTo == '') && (this.year == '')) {
      this.admin.getAllBooking();
      this.admin.getAllExams();
      this.admin.getAllStatus();
      this.admin.GetAllUsers();
    } else if ((this.dateFrom == '') && (this.dateTo != '') && (this.year == '')) {
      this.admin.SearchReport('%20', this.dateTo,'%20')
    } else if ((this.dateFrom != '') && (this.dateTo == '') && (this.year == '')) {
      this.admin.SearchReport(this.dateFrom, '%20','%20')
    } else if ((this.dateFrom != '') && (this.dateTo != '')&& (this.year == '')) {
      this.admin.SearchReport(this.dateFrom, this.dateTo,'%20')
    }else if ((this.dateFrom == '') && (this.dateTo == '')&& (this.year != '')) {
      this.admin.SearchReport('%20', '%20',this.year)
    }else if ((this.dateFrom == '') && (this.dateTo != '')&& (this.year != '')) {
      this.admin.SearchReport('%20', this.dateTo,this.year)
    }else if ((this.dateFrom != '') && (this.dateTo == '')&& (this.year != '')) {
      this.admin.SearchReport(this.dateFrom, '%20',this.year)
    }else if ((this.dateFrom != '') && (this.dateTo != '')&& (this.year != '')) {
      this.admin.SearchReport(this.dateFrom,this.dateTo,this.year)
    }
  }



  download() {
    var element = document.getElementById('table');
    var opt = {
      margin: 1.5,
      filename: 'HNSs Report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'cm', format: 'a4', orientation: 'landscape' }
    };
    // New Promise-based usage:
    html2pdf().from(element).set(opt).save();
  }

}
