import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-contact-us',
  templateUrl: './manage-contact-us.component.html',
  styleUrls: ['./manage-contact-us.component.css']
})
export class ManageContactUsComponent implements OnInit {

  constructor(public home:HomeService) { }

  ngOnInit(): void {
    this.home.getAllContact();
  }
  displayedColumns: string[] = ['contacttableid','title','description1','description2','description3','map','homeid','imagepath','Options'];
  dataSource = '';

}
