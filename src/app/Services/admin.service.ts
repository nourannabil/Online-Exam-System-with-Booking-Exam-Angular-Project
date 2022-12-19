import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Chart from 'chart.js/auto';
import { of, distinct } from 'rxjs';
import { HomeService } from './home.service';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  allBookings: any[] = [];
  AllBookingArray: any[] = [];
  exams: any[] = [];
  status: any[] = [];
  courses: any[] = [];
  ExamCourse: any[] = [];
  statusNameColumn: any[] = [];
  certificates: any[] = [];
  Roles: any[] = [];
  users: any[] = [];
  display_image: any;
  pImage: any;
  statusnumber: any[] = [];
  statistics: any = {};
  logins: any[] = [];
  loginsWithNames: any[] = [];
  numOfuserid: any[] = [];
  AllInbox: any[] = [];
  display_image2: any;
  availableTime: any[] = [];
  newavailableTime: any[] = [];
  questionBank: any[] = [];
  statustime: any[] = [];
  singleQuestion: any = {};
  certificateswithname: any[] = [];

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService, private Home: HomeService) { }


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
      for (let i = 0; i < this.status.length; i++) {
        if (this.status[i].statusid == 5 || this.status[i].statusid == 6)
          this.statusNameColumn.push(this.status[i].statusname)
        this.statusnumber.push(this.status[i])
      }

      console.log(this.status);
      this.spinner.hide();
      this.toastr.success('Data Retrieved!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.statuse)
    })
  }

  // ===============================MANAGE BOOKING TABLE ======================================
  arrayUniqueByuserid: any[] = [];
  arrayUniqueByexamid: any[] = [];

  getAllBooking() {
    this.spinner.show();
    this.http.get('https://localhost:44324/api/booking').subscribe((resp: any) => {
      this.allBookings = resp;

      this.AllBookingArray = this.allBookings.map(booking => ({
        bookingid: booking.bookingid,
        examdateuser: booking.examdateuser,
        bookingdate: booking.bookingdate,
        exampassword: booking.exampassword,
        examid: booking.examid,
        examname: this.exams.find(exam => exam.examid === booking.examid).name,
        userName: this.users.find(user => user.userid === booking.userid).fname,
        userlastName: this.users.find(user => user.userid === booking.userid).lname,
        userid: booking.userid,
        statusid: booking.statusid,
        statusname: this.status.find(status => status.statusid === booking.statusid).statusname
      }));

      this.arrayUniqueByuserid = [...new Map(this.AllBookingArray.map(item =>
        [item["userid"], item])).values()];
      console.log("arrayUniqueByuserid", this.arrayUniqueByuserid);

      this.arrayUniqueByexamid = [...new Map(this.AllBookingArray.map(item =>
        [item["examid"], item])).values()];
      console.log("arrayUniqueByexamid", this.arrayUniqueByexamid);
      console.log(this.allBookings);
      this.spinner.hide();
      this.toastr.success('Data Retrieved!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    })
  }

  createBooking(body: any) {
    debugger
    this.spinner.show();
    this.http.post('https://localhost:44324/api/booking/', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Created Successfully!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    })
  }

  updateBooking(body: any) {
    debugger
    this.spinner.show();
    this.http.put('https://localhost:44324/api/booking', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Updated Successfully!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)

    })

  }
  deleteBooking(id: number) {
    debugger
    this.spinner.show();
    this.http.delete('https://localhost:44324/api/booking/Delete/' + id).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Deleted Successfully!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)

    })

  }

  // =============================== END MANAGE BOOKING TABLE ======================================

  // ===============================  MANAGE CERTIFICATE TABLE ======================================
  AllAdminCertifiecate: any[] = [];
  GetAllCertificate() {
    //1.show spinner
    //2.hit on api
    //3.hide spinner
    //4. resp =>toastr
    this.spinner.show();
    this.http.get('https://localhost:44324/api/certificate').subscribe((resp: any) => {
      this.certificates = resp;

      this.AllAdminCertifiecate = this.certificates.filter((item) => item.title === "PROFESSIONAL CERTIFICATE");

      this.certificateswithname = this.AllAdminCertifiecate.map(item => ({
        certificateid: item.certificateid,
        title: item.title,
        description: item.description,
        imagepath: item.imagepath,
        userid: item.userid,
        bookingid: item.bookingid,
        username: this.users.find(user => user.userid === item.userid).fname
      }));


      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Data Retreived!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)

    })
  }
  CreateCertificate(body: any) {
    this.spinner.show();
    this.http.post('https://localhost:44324/api/certificate/', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Created Successfully!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)

    })
  }
  UpdateCertificate(body: any) {
    debugger
    this.spinner.show();
    this.http.put('https://localhost:44324/api/certificate', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Updated Successfully!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)

    })
  }

  DeleteCertificate(id: number) {
    this.spinner.show();
    this.http.delete('https://localhost:44324/api/certificate/delete/' + id).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Deleted Successfully!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)

    })
  }

  // =============================== End MANAGE CERTIFICATE TABLE ======================================

  // ===============================  MANAGE Role TABLE ======================================

  GetAllRole() {
    //1.show spinner
    //2.hit on api
    //3.hide spinner
    //4. resp =>toastr
    this.spinner.show();
    this.http.get('https://localhost:44324/api/role').subscribe((resp: any) => {
      this.Roles = resp;

      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Data Retreived!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)

    })
  }

  CreateRole(body: any) {
    this.spinner.show();
    this.http.post('https://localhost:44324/api/role', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Created Successfully!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)

    })
  }
  UpdateRole(body: any) {
    this.spinner.show();
    this.http.put('https://localhost:44324/api/role', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Updated Successfully!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)

    })
  }


  DeleteRole(id: number) {
    this.spinner.show();
    this.http.delete('https://localhost:44324/api/role/delete/' + id).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Deleted Successfully!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)

    })
  }


  // =============================== END MANAGE Role TABLE ======================================


  // ===============================  MANAGE USERS TABLE ======================================

  GetAllUsers() {
    //1.show spinner
    //2.hit on api
    //3.hide spinner
    //4. resp =>toastr
    this.spinner.show();
    this.http.get('https://localhost:44324/api/user').subscribe((resp: any) => {
      this.users = resp;
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Data Retreived!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)

    })
  }
  uploadAttachment(file: FormData) {
    debugger
    this.http.post('https://localhost:44324/api/user/UplodeImage/', file).subscribe((resp: any) => {

      this.display_image = resp.imagepath;
    }, err => {
      this.toastr.error('cant upload image')
      console.log(err);
    })
  }

  CreateUsers(body: any) {
    debugger
    body.imagepath = this.display_image
    this.spinner.show();
    this.http.post('https://localhost:44324/api/user/', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Created Successfully!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)

    })
  }

  UpdateUsers(body: any) {
    debugger
    body.imagepath = this.display_image
    this.spinner.show();
    this.http.put('https://localhost:44324/api/user/', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Updated Successfully!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)

    })
  }

  DeleteUser(id: number) {
    debugger
    this.spinner.show();
    this.http.delete('https://localhost:44324/api/user/delete/' + id).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Deleted Successfully!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)

    })
  }
  // =============================== END MANAGE USERS TABLE ======================================

  // ========================= Search between two dates in booking TABLE =========================
  SearchBetweenDates(dateFrom: string = '', dateTo: string = '') {
    //1.show spinner
    //2.hit on api
    //3.hide spinner
    //4. resp =>toastr
    this.spinner.show();
    this.http.get('https://localhost:44324/api/booking/SearchByDate/'
      + dateFrom + '/' + dateTo).subscribe((resp: any) => {
        this.allBookings = resp;
        console.log(resp);

        this.AllBookingArray = this.allBookings.map(booking => ({
          bookingid: booking.bookingid,
          examdateuser: booking.examdateuser,
          bookingdate: booking.bookingdate,
          exampassword: booking.exampassword,
          examid: booking.examid,
          examname: this.exams.find(exam => exam.examid === booking.examid).name,
          userName: this.users.find(user => user.userid === booking.userid).fname,
          userlastName: this.users.find(user => user.userid === booking.userid).lname,
          userid: booking.userid,
          statusid: booking.statusid,
          statusname: this.status.find(status => status.statusid === booking.statusid).statusname
        }));

        this.arrayUniqueByuserid = [...new Map(this.AllBookingArray.map(item =>
          [item["userid"], item])).values()];
        console.log("arrayUniqueByuserid", this.arrayUniqueByuserid);

        this.arrayUniqueByexamid = [...new Map(this.AllBookingArray.map(item =>
          [item["examid"], item])).values()];
        console.log("arrayUniqueByexamid", this.arrayUniqueByexamid);

        // this.AllBookingArray.forEach((x)=>{
        //     this.numOfuserid.push(x.userid);
        // })
        //  this.numOfuserid=of(this.AllBookingArray).pipe(distinct(({userid})=>userid))
        console.log(this.numOfuserid);


        this.spinner.hide();
        this.toastr.success('Data Retreived!')
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, err.status)

      })
  }

  //============================Statistics=================================
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


  //=============================Charts====================================
  ChartsFun() {
    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Bookings', 'Exams', 'Users'],
        datasets: [{
          label: '# of Votes',
          data: [this.statistics.numOfBooking, this.statistics.numOfExams, this.statistics.numOfUser],
          backgroundColor: [
            'rgba(255,99,132,0.2)',
            'rgba(54,162,235,0.2)',
            'rgba(255,206,86,0.2)',
            'rgba(75,192,192,0.2)',
            'rgba(153,102,255,0.2)',
            'rgba(255,159,64,0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,0.2)',
            'rgba(54,162,235,0.2)',
            'rgba(255,206,86,0.2)',
            'rgba(75,192,192,0.2)',
            'rgba(153,102,255,0.2)',
            'rgba(255,159,64,0.2)',
          ],
          borderWidth: 1
        }]
      }
    });
    var myPie = new Chart("myPie", {
      type: 'pie',
      data: {
        labels: ['Users Booked', 'Exams Booked', 'Exams Not Booked', 'Bookings', 'Exams', 'Users'],
        datasets: [{
          label: '# of Votes',
          data: [this.statistics.numOfUserBooked, this.statistics.numOfExamBooked, this.statistics.examNotBooked
            , this.statistics.numOfBooking, this.statistics.numOfExams, this.statistics.numOfUser],
          backgroundColor: [
            'rgba(255,99,132,0.2)',
            'rgba(54,162,235,0.2)',
            'rgba(255,206,86,0.2)',
            'rgba(75,192,192,0.2)',
            'rgba(153,102,255,0.2)',
            'rgba(255,159,64,0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,0.2)',
            'rgba(54,162,235,0.2)',
            'rgba(255,206,86,0.2)',
            'rgba(75,192,192,0.2)',
            'rgba(153,102,255,0.2)',
            'rgba(255,159,64,0.2)',
          ],
          borderWidth: 1
        }]
      }
    });
    var myLine = new Chart("myLine", {
      type: 'line',
      data: {
        labels: ['Users Booked', 'Exams Booked', 'Exams Not Booked'],
        datasets: [{
          label: '# of Votes',
          data: [this.statistics.numOfUserBooked, this.statistics.numOfExamBooked, this.statistics.examNotBooked],
          backgroundColor: [
            'rgba(255,99,132,0.2)',
            'rgba(54,162,235,0.2)',
            'rgba(255,206,86,0.2)',
            'rgba(75,192,192,0.2)',
            'rgba(153,102,255,0.2)',
            'rgba(255,159,64,0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,0.2)',
            'rgba(54,162,235,0.2)',
            'rgba(255,206,86,0.2)',
            'rgba(75,192,192,0.2)',
            'rgba(153,102,255,0.2)',
            'rgba(255,159,64,0.2)',
          ],
          borderWidth: 1
        }]
      }
    });
  }

  //=============================Course====================================
  CreateCourse(body: any) {
    body.imagepath = this.display_image;
    this.spinner.show();
    this.http.post('https://localhost:44324/api/Course/', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Course Created');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.statuse)
    });
  }

  CourseImage(file: FormData) {
    this.http.post('https://localhost:44324/api/Course/UplodeImage/', file).subscribe((resp: any) => {
      this.display_image = resp.imagepath;
    }, err => {
      this.toastr.error('Can not Upload Image');
      console.log(err);
    })
  }

  UpdateCourse(body: any) {
    body.imagepath = this.display_image;
    this.spinner.show();
    this.http.put('https://localhost:44324/api/Course/', body).subscribe((resp) => {
      this.spinner.hide();
      this.toastr.show('Updated')
    }, err => {
      this.spinner.hide();
      this.toastr.error('something wrong');
      this.toastr.error(err.masseage, err.status);
    })
  }

  DeleteCourse(id: number) {
    this.spinner.show();
    this.http.delete('https://localhost:44324/api/Course/Delete/' + id).subscribe((resp) => {
      this.spinner.hide();
      this.toastr.show('Deleted')
    }, err => {
      this.spinner.hide();
      this.toastr.error('something wrong');
      this.toastr.error(err.masseage, err.status);
    })
  }

  //=============================Exam====================================

  CreateExam(body: any) {
    body.imagepath = this.display_image;
    this.spinner.show();
    this.http.post('https://localhost:44324/api/Exam/', body).subscribe((resp: any) => {
      console.log(resp)
      this.spinner.hide();
      this.toastr.success('Created')
    }, err => {
      this.spinner.hide();
      this.toastr.error('something wrong');
      this.toastr.error(err.masseage, err.status);
    })
  }

  ExamImage(file: FormData) {
    this.http.post('https://localhost:44324/api/Exam/UplodeImage/', file).subscribe((resp: any) => {
      this.display_image = resp.imagepath;
    }, err => {
      this.toastr.error('Can not Upload Image');
      console.log(err);
    })
  }

  UpdateExam(body: any) {
    body.imagepath = this.display_image;
    this.spinner.show();
    this.http.put('https://localhost:44324/api/exam/', body).subscribe((resp) => {
      this.spinner.hide();
      this.toastr.success('Updated')
    }, err => {
      this.spinner.hide();
      this.toastr.error('something wrong');
      this.toastr.error(err.masseage, err.status);
    })
  }

  DeleteExam(id: number) {
    this.spinner.show();
    this.http.delete('https://localhost:44324/api/Exam/Delete/' + id).subscribe((resp) => {
      this.spinner.hide();
      this.toastr.success('Deleted')
    }, err => {
      this.spinner.hide();
      this.toastr.error('something wrong');
      this.toastr.error(err.masseage, err.status);
    })
  }

  //=================================================================

  //=========================Manage Testimonial ===========================


  MakeTestAccepted(id: number) {
    this.spinner.show();
    this.http.get('https://localhost:44324/api/testimonial/Accept/' + id).subscribe((resp) => {
      this.spinner.hide();
      this.toastr.show('Accepted Successfully!')
    }, err => {
      this.spinner.hide();
      this.toastr.error('something wrong');
      this.toastr.error(err.masseage, err.status);
    })
  }
  MakeTestRejected(id: number) {
    this.spinner.show();
    this.http.get('https://localhost:44324/api/testimonial/Reject/' + id).subscribe((resp) => {
      this.spinner.hide();
      this.toastr.show('Rejected Successfully!')
    }, err => {
      this.spinner.hide();
      this.toastr.error('something wrong');
      this.toastr.error(err.masseage, err.status);
    })
  }

  DeleteTest(id: number) {
    this.spinner.show();
    this.http.delete('https://localhost:44324/api/testimonial/Delete/' + id).subscribe((resp) => {
      this.spinner.hide();
      this.toastr.show('Deleted Successfully!')
    }, err => {
      this.spinner.hide();
      this.toastr.error('something wrong');
      this.toastr.error(err.masseage, err.status);
    })
  }


  //=====================================Manage Login Table =============================

  GetAllLogins() {
    this.spinner.show();
    this.http.get('https://localhost:44324/api/Login').subscribe((resp: any) => {
      this.logins = resp;
      console.log(this.logins);


      this.loginsWithNames = this.logins.map(login => ({
        loginid: login.loginid,
        username: login.username,
        password: login.password,
        userName: this.users.find(user => user.userid === login.userid).fname,
        userid: login.userid,
        roleid: login.roleid,
        rolename: this.Roles.find(role => role.roleid === login.roleid).rolename

      }));


      this.spinner.hide();
      this.toastr.success('Data Retreived!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)

    })
  }

  UpdateLogins(body: any) {
    this.spinner.show();
    this.http.put('https://localhost:44324/api/login', body).subscribe((resp: any) => {

      this.spinner.hide();
      this.toastr.success('Updated Successfully!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)

    })
  }
  // ===============================  MANAGE contact TABLE ======================================
  deletecontact(id: number) {
    debugger
    this.spinner.show();
    this.http.delete('https://localhost:44324/api/contactus/Delete/' + id).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Deleted Successfully!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)

    })
  }
  uploadContactAttachment(file: FormData) {
    debugger
    this.http.post('https://localhost:44324/api/contactus/UplodeImage/', file).subscribe((resp: any) => {
      this.display_image = resp.imagepath;
    }, err => {
      this.toastr.error('cant upload image')
      console.log(err);
    })
  }
  updateContact(body: any) {
    debugger
    body.imagepath = this.display_image;
    this.spinner.show();
    this.http.put('https://localhost:44324/api/contactus', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Updated Successfully!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)

    })

  }

  // =============================== End  MANAGE contact TABLE ======================================

  // ===============================  MANAGE home TABLE ======================================

  deletehome(id: number) {
    this.spinner.show();
    this.http.delete('https://localhost:44324/api/home/Delete/' + id).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Deleted Successfully!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)

    })
  }
  uploadHomeAttachment(file: FormData) {
    this.http.post('https://localhost:44324/api/home/UplodeImage/', file).subscribe((resp: any) => {
      this.display_image = resp.imagepath;
    }, err => {
      this.toastr.error('cant upload image')
      console.log(err);
    })
  }

  updateHome(body: any) {
    body.imagepath = this.display_image;
    this.spinner.show();
    this.http.put('https://localhost:44324/api/home', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Updated Successfully!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)

    })

  }

  // =============================== End MANAGE home TABLE ======================================

  // =============================== MANAGE About TABLE ======================================
  CreateAboutUs(body: any) {
    body.imagepath = this.display_image;
    this.spinner.show();
    this.http.post('https://localhost:44324/api/about/', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Created Successfully!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)

    })
  }
  uploadAboutAttachment(file: FormData) {
    this.http.post('https://localhost:44324/api/about/UplodeImage/', file).subscribe((resp: any) => {
      this.display_image = resp.imagepath;
    }, err => {
      this.toastr.error('cant upload image')
      console.log(err);
    })
  }

  updateAbout(body: any) {
    body.imagepath = this.display_image;
    this.spinner.show();
    this.http.put('https://localhost:44324/api/about', body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Updated Successfully!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)

    })

  }
  deleteAbout(id: number) {
    this.spinner.show();
    this.http.delete('https://localhost:44324/api/about/Delete/' + id).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Deleted Successfully!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)

    })

  }
  // ===============================End MANAGE Inbox TABLE ======================================

  GetInbox() {
    this.spinner.show();
    this.http.get('https://localhost:44324/api/ContactForm').subscribe((resp: any) => {
      this.AllInbox = resp;
      this.spinner.hide();
      this.toastr.success('Deleted')
    }, err => {
      this.spinner.hide();
      this.toastr.error('something wrong');
      this.toastr.error(err.masseage, err.status);
    })
  }

  DeleteInbox(id: number) {
    this.spinner.show();
    this.http.delete('https://localhost:44324/api/ContactForm/Delete/' + id).subscribe((resp) => {
      this.spinner.hide();
      this.toastr.success('Deleted')
    }, err => {
      this.spinner.hide();
      this.toastr.error('something wrong');
      this.toastr.error(err.masseage, err.status);
    })
  }

  // ====================CRUD Available Times ======================

  getStatus() {
    this.spinner.show();
    this.http.get('https://localhost:44324/api/status').subscribe((resp: any) => {
      this.statustime = resp;
      console.log(this.statustime);
      this.spinner.hide();
      this.toastr.success('Data Retrieved!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.statuse)
    })
  }

  getAllAvailableTime() {
    this.spinner.show();
    this.http.get('https://localhost:44324/Api/available/').subscribe((resp: any) => {
      this.availableTime = resp;

      this.newavailableTime = this.availableTime.map(available => ({
        avaliableid: available.avaliableid,
        examstartdate: available.examstartdate,
        examid: available.examid,
        statusid: available.statusid,
        examname: this.Home.exams.find(exam => exam.examid === available.examid).name,
        statusname: this.statustime.find(status => status.statusid === available.statusid).statusname
      }));

      console.log(this.availableTime);
      this.spinner.hide();
      this.toastr.success('Data Retrieved!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.statuse)
    })
  }

  createAvailableTime(body: any) {
    this.spinner.show();
    this.http.post('https://localhost:44324/Api/available/', body).subscribe((resp) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Created !!');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    }
    )
  }

  UpdateAvailableTime(body: any) {
    this.spinner.show();
    this.http.put('https://localhost:44324/Api/available/', body).subscribe((resp) => {
      this.spinner.hide();
      this.toastr.success('Updated Successfully!');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    })
  }

  deleteAvailableTime(id: number) {
    this.spinner.show();
    this.http.delete('https://localhost:44324/Api/available/Delete/' + id).subscribe((resp) => {
      this.spinner.hide();
      this.toastr.success('Deleted Successfully !!');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    })
  }

  // ====================CRUD QuestionBank ======================


  getAllQuestionBank() {
    this.spinner.show();
    this.http.get('https://localhost:44324/Api/QuestionBank').subscribe((resp: any) => {
      this.questionBank = resp;

      this.questionBank = this.questionBank.map(bank => ({
        questionid: bank.questionid,
        questiontitle: bank.questiontitle,
        correctanswer: bank.correctanswer,
        answeroption1: bank.answeroption1,
        answeroption2: bank.answeroption2,
        answeroption3: bank.answeroption3,
        answeroption4: bank.answeroption4,
        questionmark: bank.questionmark,
        courseid: bank.courseid,
        coursename: this.Home.courses.find(course => course.courseid === bank.courseid).name
      }));

      console.log(this.questionBank);
      this.spinner.hide();
      this.toastr.success('Data Retrieved!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.statuse)
    })
  }

  createQuestionBank(body: any) {
    this.spinner.show();
    this.http.post('https://localhost:44324/Api/QuestionBank', body).subscribe((resp) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Created !!');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    }
    )
  }

  UpdateQuestionBank(body: any) {
    this.spinner.show();
    this.http.put('https://localhost:44324/Api/QuestionBank', body).subscribe((resp) => {
      this.spinner.hide();
      this.toastr.success('Updated Successfully!');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    })
  }

  deleteQuestionBank(id: number) {
    this.spinner.show();
    this.http.delete('https://localhost:44324/Api/QuestionBank/Delete/' + id).subscribe((resp) => {
      this.spinner.hide();
      this.toastr.success('Deleted Successfully !!');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    })
  }

  GetQuestionById(id: number) {
    this.spinner.show();
    this.http.get('https://localhost:44324/Api/QuestionBank/getbyid/' + id).subscribe((resp: any) => {
      this.singleQuestion = resp;
      this.spinner.hide();
      this.toastr.success(' Successfully !!');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    })
  }


  //===================edit password===========================

  user: any;
  userPass: any = {};
  GetPass() {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
    this.userPass = this.logins.filter((x) => x.userid == this.user.Userid)
    console.log("userPassObject From Admin");
    console.log(this.userPass);
  }


  // =====================================================================

  // ========================= SearchReport=========================
  SearchReport(dateFrom: string = '', dateTo: string = '', year: string = '') {
    this.spinner.show();
    this.http.get('https://localhost:44324/Api/Report/GetReport/'
      + dateFrom + '/' + dateTo + '/' + year).subscribe((resp: any) => {
        this.allBookings = resp;
        console.log(resp);

        this.AllBookingArray = this.allBookings.map(booking => ({
          bookingid: booking.bookingid,
          examdateuser: booking.examdateuser,
          bookingdate: booking.bookingdate,
          exampassword: booking.exampassword,
          examid: booking.examid,
          examname: this.exams.find(exam => exam.examid === booking.examid).name,
          userName: this.users.find(user => user.userid === booking.userid).fname,
          userlastName: this.users.find(user => user.userid === booking.userid).lname,
          userid: booking.userid,
          statusid: booking.statusid,
          statusname: this.status.find(status => status.statusid === booking.statusid).statusname
        }));

        this.arrayUniqueByuserid = [...new Map(this.AllBookingArray.map(item =>
          [item["userid"], item])).values()];
        console.log("arrayUniqueByuserid", this.arrayUniqueByuserid);

        this.arrayUniqueByexamid = [...new Map(this.AllBookingArray.map(item =>
          [item["examid"], item])).values()];
        console.log("arrayUniqueByexamid", this.arrayUniqueByexamid);

        console.log(this.numOfuserid);


        this.spinner.hide();
        this.toastr.success('Data Retreived!')
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, err.status)

      })
  }
}

