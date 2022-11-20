import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HomeService } from '../Services/home.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  constructor(private spinner:NgxSpinnerService,public home:HomeService) { }

  ngOnInit(): void {
    this.home.getAllContact();
  }

}

