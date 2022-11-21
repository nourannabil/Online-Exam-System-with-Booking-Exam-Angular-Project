import { Component, Input,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../Services/home.service';

@Component({
  selector: 'app-eaxam-info-card',
  templateUrl: './eaxam-info-card.component.html',
  styleUrls: ['./eaxam-info-card.component.css']
})
export class EaxamInfoCardComponent implements OnInit {
  
  constructor(public home:HomeService,private router:Router) { }


  ngOnInit(): void {
    this.home.getAllAvailable();
  }
  goToLogin(){
   this.router.navigate(['security/login']);
  }

}
