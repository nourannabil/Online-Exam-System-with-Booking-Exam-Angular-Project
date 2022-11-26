import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Chart from 'chart.js/auto';
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
  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService) { }


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
  getAllBooking() {//setps to hit on  data from api
    //1.show spinner
    //2.hit on api
    //3.hide spinner
    //4. resp =>toastr



    this.spinner.show();
    this.http.get('https://localhost:44324/api/booking').subscribe((resp: any) => {
      this.allBookings = resp;

      this.AllBookingArray = this.allBookings.map(booking => ({
        bookingid: booking.bookingid,
        examdateuser: booking.examdateuser,
        bookingdate: booking.bookingdate,
        exampassword: booking.exampassword,
        examid: this.exams.find(exam => exam.examid === booking.examid).name,
        //booking.examid,
        userid: booking.userid,
        statusid: this.status.find(status => status.statusid === booking.statusid).statusname

      }));


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
  GetAllCertificate() {
    //1.show spinner
    //2.hit on api
    //3.hide spinner
    //4. resp =>toastr
    this.spinner.show();
    this.http.get('https://localhost:44324/api/certificate').subscribe((resp: any) => {
      this.certificates = resp;
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
  SearchBetweenDates(dateFrom?: Date, dateTo?: Date) {
    //1.show spinner
    //2.hit on api
    //3.hide spinner
    //4. resp =>toastr
    this.spinner.show();
    this.http.get('https://localhost:44324/api/booking/SearchByDate/' + dateFrom + '/' + dateTo).subscribe((resp: any) => {
      this.allBookings = resp;
      console.log(resp);

      this.AllBookingArray = this.allBookings.map(booking => ({
        bookingid: booking.bookingid,
        examdateuser: booking.examdateuser,
        bookingdate: booking.bookingdate,
        exampassword: booking.exampassword,
        examid: this.exams.find(exam => exam.examid === booking.examid).name,
        //booking.examid,
        userid: booking.userid,
        statusid: this.status.find(status => status.statusid === booking.statusid).statusname

      }));
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
    debugger
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
      this.toastr.show('Created')
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
    this.http.put('https://localhost:44324/api/Exam/', body).subscribe((resp) => {
      this.spinner.hide();
      this.toastr.show('Updated')
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
      this.toastr.show('Deleted')
    }, err => {
      this.spinner.hide();
      this.toastr.error('something wrong');
      this.toastr.error(err.masseage, err.status);
    })
  }

  //=================================================================


}

