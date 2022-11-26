import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { HomeService } from 'src/app/Services/home.service';
import { CreateCoursesComponent } from '../create-courses/create-courses.component';

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.css']
})
export class ManageCoursesComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'description', 'symbol', 'Options'];
  dataSource = '';

  UpdateForm: FormGroup = new FormGroup({
    courseid: new FormControl(),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    imagepath: new FormControl()
  })

  constructor(public Home: HomeService, private dialog: MatDialog, public Admin: AdminService) { }

  @ViewChild('CallUpdateDialog') CallUpdateDialog!: TemplateRef<any>;
  @ViewChild('CallDeleteDialog') CallDeleteDialog!: TemplateRef<any>;

  ngOnInit(): void {
    this.Home.getAllCourses();
  }


  openDialog() {
    this.dialog.open(CreateCoursesComponent);
  }

  previous_data: any = {}
  OpenUpdateDialog(obj: any) {
    this.previous_data = {
      courseid: obj.courseid,
      name: obj.name,
      description: obj.description,
      imagepath: obj.imagepath
    }
    this.UpdateForm.controls['courseid'].setValue(this.previous_data.courseid);
    this.UpdateForm.controls['imagepath'].setValue(this.previous_data.imagepath);
    this.Admin.display_image = this.UpdateForm.controls['imagepath'].value;
    this.dialog.open(this.CallUpdateDialog);
  }

  SaveData() {
    this.Admin.UpdateCourse(this.UpdateForm.value);
  }

  uploadFile(file: any) {
    if (file.length == 0)
      return;
    let fileToUpload = <File>file[0]//the first image
    const formdata = new FormData();
    formdata.append('file', fileToUpload, fileToUpload.name);
    this.Admin.CourseImage(formdata);
  }

  OpenDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(this.CallDeleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result == 'yes') {
          this.Admin.DeleteCourse(id);
        } else if (result == 'no') {
          console.log("Thank You")
        }
      }
    })
  }
}
