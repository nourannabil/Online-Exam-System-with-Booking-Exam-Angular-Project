import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-create-exams',
  templateUrl: './create-exams.component.html',
  styleUrls: ['./create-exams.component.css']
})
export class CreateExamsComponent implements OnInit {

  constructor(public Home: HomeService , public Admin: AdminService) { }

  CreateForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    examduration: new FormControl('', Validators.required),
    examprice: new FormControl('', Validators.required),
    numofquestions: new FormControl('', Validators.required),
    passmark: new FormControl('', Validators.required),
    courseid: new FormControl('', Validators.required),
    imagepath: new FormControl()
  })

  ngOnInit(): void {
  }

  SaveData() {
    this.Admin.CreateExam(this.CreateForm.value)
  }

  uploadFile(file: any) {
    if (file.length == 0)
      return;
    let fileToUpload = <File>file[0]//the first image
    const formdata = new FormData();
    formdata.append('file', fileToUpload, fileToUpload.name);
    this.Admin.ExamImage(formdata);
  }
}
