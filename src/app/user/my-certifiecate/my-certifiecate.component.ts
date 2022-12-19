import { Component, OnInit } from '@angular/core';
import * as html2pdf from 'html2pdf.js';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-my-certifiecate',
  templateUrl: './my-certifiecate.component.html',
  styleUrls: ['./my-certifiecate.component.css']
})
export class MyCertifiecateComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'description', 'symbol', 'Options', 'link'];
  dataSource = '';

  constructor(public userService: UserService) { }

  user: any
  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
    console.log(this.user.Userid)
    this.userService.MyCertifiecate(this.user.Userid);
  }

  download() {
    var element = document.getElementById('table');
    var opt = {
      margin: 1.5,
      filename: 'Exam Certificate.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'cm', format: 'a4', orientation: 'landscape' }
    };

    // New Promise-based usage:
    html2pdf().from(element).set(opt).save();
  }

  Print(certificateNum: number) {
    console.log(certificateNum)

    this.userService.mySingleCertifiecate = this.userService.myCertifiecate.filter((item) =>
      item.certificateid == certificateNum)

    console.log(this.userService.mySingleCertifiecate);

    this.download();
  }
}
