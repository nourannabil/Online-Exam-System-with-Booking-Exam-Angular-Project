import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { HomeService } from 'src/app/Services/home.service';
import { CreateExamsComponent } from '../create-exams/create-exams.component';

@Component({
  selector: 'app-manage-exams',
  templateUrl: './manage-exams.component.html',
  styleUrls: ['./manage-exams.component.css']
})
export class ManageExamsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'description', 'examduration', 'examprice','numofquestions' ,'passmark', 'coursename', 'symbol', 'Options'];
  dataSource = '';

  constructor(public Home: HomeService, private dialog: MatDialog, public Admin: AdminService) { }

  UpdateForm: FormGroup = new FormGroup({
    examid: new FormControl(),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    examduration: new FormControl('', Validators.required),
    examprice: new FormControl('', Validators.required),
    numofquestions: new FormControl('', Validators.required),
    passmark: new FormControl('', Validators.required),
    courseid: new FormControl('', Validators.required),
    imagepath: new FormControl()
  })

  @ViewChild('CallUpdateDialog') CallUpdateDialog!: TemplateRef<any>;
  @ViewChild('CallDeleteDialog') CallDeleteDialog!: TemplateRef<any>;

  ngOnInit(): void {
    this.Home.getAllCourses();
    this.Home.getAllExams();
  }

  openDialog() {
    this.dialog.open(CreateExamsComponent);
  }

  previous_data: any = {};
  OpenUpdateDialog(obj: any) {
    this.previous_data = {
      examid: obj.examid,
      name: obj.name,
      description: obj.description,
      examduration: obj.examduration,
      examprice: obj.examprice,
      numofquestions: obj.numofquestions,
      passmark: obj.passmark,
      courseid: obj.courseid,
      imagepath: obj.imagepath
    }
    this.UpdateForm.controls['examid'].setValue(this.previous_data.examid);
    this.UpdateForm.controls['imagepath'].setValue(this.previous_data.imagepath);
    this.Admin.display_image = this.UpdateForm.controls['imagepath'].value;
    this.dialog.open(this.CallUpdateDialog)
  }

  SaveData() {
    this.Admin.UpdateExam(this.UpdateForm.value);
  }

  uploadFile(file: any) {
    if (file.length == 0)
      return;
    let fileToUpload = <File>file[0]//the first image
    const formdata = new FormData();
    formdata.append('file', fileToUpload, fileToUpload.name);
    this.Admin.ExamImage(formdata);
  }

  OpenDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(this.CallDeleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result == 'yes') {
          this.Admin.DeleteExam(id);
        } else if (result == 'no') {
          console.log("Thank You")
        }
      }
    })
  }
}
