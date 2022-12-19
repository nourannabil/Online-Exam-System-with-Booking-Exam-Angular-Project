import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-failed',
  templateUrl: './failed.component.html',
  styleUrls: ['./failed.component.css']
})
export class FailedComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  failed() {
    this.route.navigate(['user/userProfile'])
  }
}
