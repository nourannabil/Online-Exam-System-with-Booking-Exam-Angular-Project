import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.css']
})
export class PassComponent implements OnInit {

  certifiecateForm: FormGroup = new FormGroup({
    title: new FormControl('PROFESSIONAL CERTIFICATE'),
    description: new FormControl('In recognition of passing the'),
    userid: new FormControl(2),
    bookingid: new FormControl(109)
  })

  constructor(public User: UserService) { }

  ngOnInit(): void {
  }

  SeeCertificate() {
    console.log("Certificate made form SeeCertificate");
    this.Create();
  }

  Create() {
    console.log("Certificate made form Create Form")
    this.User.CreateCertifiecate(this.certifiecateForm.value);
    //  عشان  يكبس على زر و يطبع الشهادة  MyCertifiecate هون بدي اخليه يروح على ال
  }
}
