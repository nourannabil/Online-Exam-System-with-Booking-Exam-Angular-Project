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
  ExamCourse: any[] = [];
  homeinfo: any = {};
  statistics: any = {};
  aboutinfo: any = {};
  examById: any = {};
  allAvailableTime: any[] = [];
  examavailabletime: any[] = [];
  contactusinfo: any[] = [];
  allaboutinfo: any[] = [];
  allhomeinfo: any[] = [];
  testimonialinfo: any[] = [];
  availableTime: any[] = [];
  status: any[] = [];
  ExamTime: any[] = [];
  questionBank: any[] = [];
  CourseBank: any[] = [];

  contactForm: FormGroup = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required])
  });

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  getAllContact() {//setps to hit on  data from api
    //1.show spinner
    //2.hit on api
    //3.hide spinner
    //4. resp =>toastr

    this.spinner.show();
    this.http.get('https://localhost:44324/api/contactus').subscribe((resp: any) => {
      this.contactusinfo = resp;
      console.log(this.contactusinfo);
      this.spinner.hide();
      this.toastr.success('Data Retrieved!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    })
  }
  getAllabout() {
    this.spinner.show();
    this.http.get('https://localhost:44324/api/about').subscribe((resp: any) => {
      this.allaboutinfo = resp;
      console.log(this.allaboutinfo);
      this.spinner.hide();
      this.toastr.success('Data Retrieved!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    })
  }

  getAllhome() {
    this.spinner.show();
    this.http.get('https://localhost:44324/api/home').subscribe((resp: any) => {
      this.allhomeinfo = resp;
      console.log(this.allhomeinfo);
      this.spinner.hide();
      this.toastr.success('Data Retrieved!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    })
  }
  gettestimonialinfo() {
    this.spinner.show();
    this.http.get('https://localhost:44324/api/testimonial').subscribe((resp: any) => {
      this.testimonialinfo = resp;
      console.log(this.testimonialinfo);
      this.spinner.hide();
      this.toastr.success('Data Retrieved!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    })
  }

  getAllCourses() {//setps to hit on  data from api
    //1.show spinner
    //2.hit on api
    //3.hide spinner
    //4. resp =>toastr

    this.spinner.show();
    this.http.get('https://localhost:44324/api/course').subscribe((resp: any) => {
      this.courses = resp;
      console.log(this.courses);
      this.spinner.hide();
      this.toastr.success('Data Retrieved!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    })
  }

  getAllExams() {
    this.spinner.show();
    this.http.get('https://localhost:44324/api/exam').subscribe((resp: any) => {

      this.exams = resp;

      this.ExamCourse = this.exams.map(exam => ({
        examid: exam.examid,
        name: exam.name,
        description: exam.description,
        imagepath: exam.imagepath,
        examduration: exam.examduration,
        examprice: exam.examprice,
        passmark: exam.passmark,
        coursename: this.courses.find(course => course.courseid === exam.courseid).name
      }));

      console.log(this.exams);
      this.spinner.hide();
      this.toastr.success('Data Retrieved!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    })
  }

  getAllStatus() {
    this.spinner.show();
    this.http.get('https://localhost:44324/api/status').subscribe((resp: any) => {
      this.status = resp;
      console.log(this.status);
      this.spinner.hide();
      this.toastr.success('Data Retrieved!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.statuse)
    })
  }

  getAllAvailableTime() {
    this.spinner.show();
    this.http.get('https://localhost:44324/Api/available').subscribe((resp: any) => {
      this.availableTime = resp;

      this.ExamTime = this.availableTime.map(available => ({
        avaliableid: available.avaliableid,
        examstartdate: available.examstartdate,
        examname: this.exams.find(exam => exam.examid === available.examid).name,
        statusname: this.status.find(status => status.statusid === available.statusid).statusname
      }));

      console.log(this.availableTime);
      this.spinner.hide();
      this.toastr.success('Data Retrieved!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.statuse)
    })
  }

  getAllQuestionBank() {
    this.spinner.show();
    this.http.get('https://localhost:44324/Api/QuestionBank').subscribe((resp: any) => {
      this.questionBank = resp;

      this.CourseBank = this.questionBank.map(bank => ({
        questionid: bank.questionid,
        questiontitle: bank.questiontitle,
        correctanswer: bank.correctanswer,
        answeroption1: bank.answeroption1,
        answeroption2: bank.answeroption2,
        answeroption3: bank.answeroption3,
        answeroption4: bank.answeroption4,
        questionmark: bank.questionmark,
        coursename: this.courses.find(course => course.courseid === bank.courseid).name

      }));

      console.log(this.questionBank);
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
    this.http.get('https://localhost:44324/api/Statistics/getstatistics').subscribe((resp: any) => {
      this.statistics = resp;
      console.log(this.statistics);
      this.spinner.hide();
      this.toastr.success('Data Retrieved!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    })
  }

  getAboutInfo() {
    this.spinner.show();
    this.http.get('https://localhost:44324/api/about/GetById/1').subscribe((resp: any) => {
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
    this.http.get('https://localhost:44324/api/home/GetById/41').subscribe((resp: any) => {
      this.homeinfo = resp;
      console.log(this.homeinfo);

      this.spinner.hide();
      this.toastr.success('Data Retrieved!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    })


  }

  getExamById(id: number) {
    this.spinner.show();
    this.http.get('https://localhost:44324/api/exam/getbyid/' + id).subscribe((resp: any) => {
      this.examById = resp;
      console.log(this.examById);

      this.spinner.hide();
      this.toastr.success('Data Retrieved!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    })
  }

  getAllAvailable() {
    this.spinner.show();
    this.http.get('https://localhost:44324/api/available').subscribe((resp: any) => {
      this.allAvailableTime = resp;
      console.log(this.allAvailableTime);

      this.spinner.hide();
      this.toastr.success('Data Retrieved!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    })
  }

//=================================Search On Exm Name in Home==========================

SearchByExamName(name:string) {
  console.log(name.length);
  
if(name.length>0){
  debugger
  this.spinner.show();
  this.http.get('https://localhost:44324/api/exam/GetExamByName/'+name).subscribe((resp: any) => {
    this.exams = resp;
    console.log(this.exams);
  }, err => {
    this.toastr.error(err.message, err.status)
  })
}else{
  debugger
  this.spinner.show();
  this.http.get('https://localhost:44324/api/exam/GetExamByName/ ').subscribe((resp: any) => {
    this.exams = resp;
    console.log(this.exams);
  }, err => {
    this.toastr.error(err.message, err.status)
  })

}}













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


