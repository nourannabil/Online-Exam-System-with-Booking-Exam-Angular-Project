import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public admin:AdminService,private router: Router) { }

  user: any
  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
  }

  LogOut() {
    localStorage.clear();
    this.router.navigate(['security/login'])
  }
  
  callCharts(){
    this.admin.ChartsFun();
  }
}
