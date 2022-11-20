import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  selectedCourse: any = {};
  courses: any[] = [];
  exams: any[] = [];
  ExamCourse:any[]=[];
  homeinfo: any = {};
  statistics: any = {};
  aboutinfo: any = {};

  contactForm: FormGroup = new FormGroup ({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required])
  });

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  getAllCourses() {//setps to hit on  data from api
    //1.show spinner
    //2.hit on api
    //3.hide spinner
    //4. resp =>toastr

    this.spinner.show();
    this.http.get('https://localhost:44371/api/course').subscribe((resp: any) => {
      this.courses = resp;
      console.log(this.courses);
      this.spinner.hide();
      this.toastr.success('Data Retrieved!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.statuse)
    })
  }

  getAllExams() {
    this.spinner.show();
    this.http.get('https://localhost:44371/api/exam').subscribe((resp: any) => {

      this.exams = resp;

      this.ExamCourse = this.exams.map(exam => ({
        examid:exam.examid,
        name: exam.name,
        description: exam.description,
        imagepath:exam.imagepath,
        examduration:exam.examduration,
        examprice:exam.examprice,
        passmark:exam.passmark,
        coursename: this.courses.find(course => course.courseid === exam.courseid).name
      }));

      console.log(this.exams);
      this.spinner.hide();
      this.toastr.success('Data Retrieved!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.statuse)
    })
  }


  /////////////////////////////////////////////////////////////////////////////////
  getStatistics() {
    this.spinner.show();
    this.http.get('https://localhost:44371/api/Statistics/getstatistics').subscribe((resp: any) => {
      this.statistics = resp;
      console.log(this.statistics);
      this.spinner.hide();
      this.toastr.success('Data Retrieved!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.statuse)
    })
  }

  getAboutInfo() {
    this.spinner.show();
    this.http.get('https://localhost:44371/api/about/GetById/1').subscribe((resp: any) => {
      this.aboutinfo = resp;
      console.log(this.aboutinfo);

      this.spinner.hide();
      this.toastr.success('Data Retrieved!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.statuse)
    })
  }

  getHomeSlider() {
    this.spinner.show();
    this.http.get('https://localhost:44371/api/home/GetById/41').subscribe((resp: any) => {
      this.homeinfo = resp;
      console.log(this.homeinfo);

      this.spinner.hide();
      this.toastr.success('Data Retrieved!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.statuse)
    })
  }

  /* new - Contact us*/
  submit() {
    console.log(this.contactForm.value);
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000
    )
    this.contactForm.reset();
  }
  
}


