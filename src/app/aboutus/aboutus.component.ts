import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HomeService } from '../Services/home.service';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, public home: HomeService) { }

  ngOnInit(): void {
    this.home.getAboutInfo();
    localStorage.getItem('token');
  }

}
