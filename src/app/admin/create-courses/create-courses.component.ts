import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-create-courses',
  templateUrl: './create-courses.component.html',
  styleUrls: ['./create-courses.component.css']
})
export class CreateCoursesComponent implements OnInit {

  CreateForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    imagepath: new FormControl()
  })

  constructor(public Home: HomeService, public Admin: AdminService) { }

  ngOnInit(): void {
  }

  SaveData() {
    this.Admin.CreateCourse(this.CreateForm.value);
  }

  uploadFile(file: any) {
    if (file.length == 0)
      return;
    let fileToUpload = <File>file[0]//the first image
    const formdata = new FormData();
    formdata.append('file', fileToUpload, fileToUpload.name);
    this.Admin.CourseImage(formdata);
  }

}
