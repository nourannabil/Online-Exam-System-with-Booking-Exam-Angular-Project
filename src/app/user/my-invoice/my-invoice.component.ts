import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/Services/user.service';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-my-invoice',
  templateUrl: './my-invoice.component.html',
  styleUrls: ['./my-invoice.component.css']
})
export class MyInvoiceComponent implements OnInit {

  displayedColumns: string[] = ['position', 'description', 'symbol', 'option'];
  dataSource = '';
  Open: any;

  constructor(public userService: UserService, private dialog: MatDialog) { }

  @ViewChild('CallInvoiceDialog') CallInvoiceDialog!: TemplateRef<any>

  user: any
  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
    console.log(this.user.Userid)
    this.userService.MyInvoice(this.user.Userid);
  }

  Invoice_data: any = {}
  InvoiceInfo(obj: any) {
    this.Invoice_data = {
      id: obj.id,
      // balanceAfterPay: obj.balanceAfterPay,
      paydate: obj.paydate,
      cardnumber: obj.cardnumber,
      examprice: obj.examprice,
      name: obj.name,
      bookingid: obj.bookingid,
      examdateuser: obj.examdateuser,
    }
    // this.dialog.open(this.CallInvoiceDialog);
    this.download();
  }

  download() {
    var element = document.getElementById('table');
    var opt = {
      margin: 1.5,
      filename: 'Exam Invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'cm', format: 'a4', orientation: 'landscape' }
    };

    // New Promise-based usage:
    html2pdf().from(element).set(opt).save();
  }
}
