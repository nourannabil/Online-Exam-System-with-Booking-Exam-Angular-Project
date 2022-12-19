import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-question-bank',
  templateUrl: './manage-question-bank.component.html',
  styleUrls: ['./manage-question-bank.component.css']
})
export class ManageQuestionBankComponent implements OnInit {

  constructor(public Home: HomeService, public Admin: AdminService, private dialog: MatDialog) { }

  @ViewChild('callCreateDialog') callCreateDialog!: TemplateRef<any>
  @ViewChild('callUpdateDialog') callUpdateDialog!: TemplateRef<any>
  @ViewChild('callDeleteDailog') callDeleteDialog!: TemplateRef<any>
  @ViewChild('callGetByidDailog') callGetByidDailog!: TemplateRef<any>

  createForm: FormGroup = new FormGroup({
    questiontitle: new FormControl('', Validators.required),
    correctanswer: new FormControl('', Validators.required),
    answeroption1: new FormControl('', Validators.required),
    answeroption2: new FormControl('', Validators.required),
    answeroption3: new FormControl('', Validators.required),
    answeroption4: new FormControl('', Validators.required),
    questionmark: new FormControl('', Validators.required),
    courseid: new FormControl('', Validators.required)
  })

  updateForm: FormGroup = new FormGroup({
    questionid: new FormControl(),
    questiontitle: new FormControl('', Validators.required),
    correctanswer: new FormControl('', Validators.required),
    answeroption1: new FormControl('', Validators.required),
    answeroption2: new FormControl('', Validators.required),
    answeroption3: new FormControl('', Validators.required),
    answeroption4: new FormControl('', Validators.required),
    questionmark: new FormControl('', Validators.required),
    courseid: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.Home.getAllCourses();
    this.Admin.getAllQuestionBank();
  }

  displayedColumns: string[] = ['position', 'name', 'course', 'Options'];
  dataSource = '';

  openCreateDailog() {
    this.dialog.open(this.callCreateDialog);
  }

  Save() {
    this.Admin.createQuestionBank(this.createForm.value);
  }

  p_data: any = {};
  openUpdateDialog(element: any) {
    console.log(element);
    this.p_data = {
      questionid: element.questionid,
      questiontitle: element.questiontitle,
      correctanswer: element.correctanswer,
      answeroption1: element.answeroption1,
      answeroption2: element.answeroption2,
      answeroption3: element.answeroption3,
      answeroption4: element.answeroption4,
      questionmark: element.questionmark,
      courseid: element.courseid
    }
    this.updateForm.controls['questionid'].setValue(this.p_data.questionid);
    this.dialog.open(this.callUpdateDialog);
  }

  saveData() {
    this.Admin.UpdateQuestionBank(this.updateForm.value);
  }

  openDeleteDailog(id: number) {
    const dialogRef = this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result == 'yes') {
          debugger
          this.Admin.deleteQuestionBank(id);
        }
        else if (result == 'no')
          console.log('thank you ');
      }
    })
  }

  openGetByidDailog(id: number) {
    this.dialog.open(this.callGetByidDailog);
    this.Admin.GetQuestionById(id);
  }
}

