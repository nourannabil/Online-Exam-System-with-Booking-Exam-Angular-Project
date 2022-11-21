import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-about-us',
  templateUrl: './manage-about-us.component.html',
  styleUrls: ['./manage-about-us.component.css']
})
export class ManageAboutUsComponent implements OnInit {

  constructor(public home:HomeService) { }

  ngOnInit(): void {
    this.home.getAllabout();
  }
  displayedColumns: string[] = ['aboutid','title','description1','description2','imagepath','homeid','Options'];
  dataSource = '';
}
