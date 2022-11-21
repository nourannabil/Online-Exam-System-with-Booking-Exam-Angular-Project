import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-home',
  templateUrl: './manage-home.component.html',
  styleUrls: ['./manage-home.component.css']
})
export class ManageHomeComponent implements OnInit {

  constructor(public home:HomeService) { }

  ngOnInit(): void {
    this.home.getAllhome();
  }
  displayedColumns: string[] = ['homeid','title','description1','description2','description3','imagepath','Options'];
  dataSource = '';
}
