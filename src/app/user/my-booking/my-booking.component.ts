import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/Services/quiz.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css']
})
export class MyBookingComponent implements OnInit {

  constructor(public userService: UserService, private Route: Router, public Quiz: QuizService, private Tostar: ToastrService) { }

  displayedColumns: string[] = ['position', 'name', 'description', 'symbol', 'Options', 'link'];
  dataSource = '';

  user: any;
  certificate: any[] = [];

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.user = JSON.parse(this.user);
    console.log(this.user.Userid)
    this.userService.MyBooking(this.user.Userid);
    this.userService.GetAllCertificate();
  }

  StartExam(courseid: number) {
    this.Quiz.GetRandomQuestionsByCourseId(courseid);
    this.Route.navigate(['quiz/examLogin']);
  }

  BookingId(bookingNum: number) {
    console.log(bookingNum)
    this.userService.mySingleBooking = this.userService.myBooking.filter((item) =>
      item.bookingid == bookingNum)
    console.log(this.userService.mySingleBooking);
    ////////////////////////////////////////////////////////////////
    const course = this.userService.mySingleBooking
      .filter((item: any) => item.bookingid == bookingNum)
      .map((item: any) => {
        const { courseId } = item;
        return { courseId }
      });
    console.log(course);
    ////////////////////////////////////////////////////////////////
    const Duration = this.userService.mySingleBooking
      .filter((item: any) => item.bookingid == bookingNum)
      .map((item: any) => {
        const { examduration } = item;
        return { examduration }
      });
    console.log(Duration);

    ///////////////////////////////////////////////////////////////////////
    const date = this.userService.mySingleBooking.map((item: any) => {
      const { examdateuser } = item;
      return { examdateuser }
    });

    Object.keys(date).forEach((i: any) => {
      var timeStamp = new Date().getTime()
      var dateFormat = new Date(timeStamp);
      var Today = (dateFormat.getDate() +
        "-" + (dateFormat.getMonth() + 1) +
        "-" + dateFormat.getFullYear());
      console.log(`Today is ${Today}`)


      var dateFormat = new Date();
      if (dateFormat.getMinutes() >= 10) {
        var datehajar = (dateFormat.getFullYear() +
          "-" + (dateFormat.getMonth() + 1) +
          "-0" + dateFormat.getUTCDate() +
          "T" + (dateFormat.getHours()) +
          ":" + dateFormat.getMinutes() +
          ":" + (dateFormat.getSeconds()));
        console.log("datehajar", datehajar);
      } else {
        var datehajar = (dateFormat.getFullYear() +
          "-" + (dateFormat.getMonth() + 1) +
          "-0" + dateFormat.getUTCDate() +
          "T" + (dateFormat.getHours()) +
          ":0" + dateFormat.getMinutes() +
          ":" + (dateFormat.getSeconds()));
        console.log("datehajar", datehajar);
      }



      /////////////////////////////////////
      var examdateuser = date[i].examdateuser
      var dateexam = new Date(examdateuser);
      if (dateexam.getMinutes() >= 10) {
        var dateexampure = (dateexam.getFullYear() +
          "-" + (dateexam.getMonth() + 1) +
          "-0" + dateexam.getDate() +
          "T" + (dateexam.getHours()) +
          ":" + (dateexam.getMinutes()) +
          ":" + (dateexam.getSeconds()));
      } else {
        var dateexampure = (dateexam.getFullYear() +
          "-" + (dateexam.getMonth() + 1) +
          "-0" + dateexam.getDate() +
          "T" + (dateexam.getHours()) +
          ":0" + (dateexam.getMinutes()) +
          ":" + (dateexam.getSeconds()));
      }

      /////////////////////////////////////////
      Object.keys(Duration).forEach((i: any) => {
        var examdateuser = date[i].examdateuser
        var dateexam = new Date(examdateuser);

        

        if (dateexam.getMinutes()+ parseInt(Duration[i].examduration) >= 10) {
          if(dateexam.getMinutes()+ parseInt(Duration[i].examduration)>=60){
            var dateexamnew = (dateexam.getFullYear() +
            "-" + (dateexam.getMonth() + 1) +
            "-0" + dateexam.getDate() +
            "T" + (dateexam.getHours()+1) +
            ":" + ((dateexam.getMinutes() + parseInt(Duration[i].examduration))-60) +
            ":" + (dateexam.getSeconds()));

            if((dateexam.getMinutes() + parseInt(Duration[i].examduration))-60<10){
              var dateexamnew = (dateexam.getFullYear() +
              "-" + (dateexam.getMonth() + 1) +
              "-0" + dateexam.getDate() +
              "T" + (dateexam.getHours()+1) +
              ":0" + ((dateexam.getMinutes() + parseInt(Duration[i].examduration))-60) +
              ":" + (dateexam.getSeconds()));
            }else{
              var dateexamnew = (dateexam.getFullYear() +
              "-" + (dateexam.getMonth() + 1) +
              "-0" + dateexam.getDate() +
              "T" + (dateexam.getHours()+1) +
              ":" + ((dateexam.getMinutes() + parseInt(Duration[i].examduration))-60) +
              ":" + (dateexam.getSeconds()));
            }
          }else{
          var dateexamnew = (dateexam.getFullYear() +
            "-" + (dateexam.getMonth() + 1) +
            "-0" + dateexam.getDate() +
            "T" + (dateexam.getHours()) +
            ":" + (dateexam.getMinutes() + parseInt(Duration[i].examduration)) +
            ":" + (dateexam.getSeconds()));}
        } else {
          var dateexamnew = (dateexam.getFullYear() +
            "-" + (dateexam.getMonth() + 1) +
            "-0" + dateexam.getDate() +
            "T" + (dateexam.getHours()) +
            ":0" + (dateexam.getMinutes() + parseInt(Duration[i].examduration)) +
            ":" + (dateexam.getSeconds()));
        }


        // console.log("datehajar", datehajar);
        // console.log("dateexam", dateexam);
        // console.log("examdateuserhajar", examdateuser);
        // console.log("examdateuserhajar+1", (dateexamnew));
        ////////////////////////////////////////

        debugger


        if (datehajar == dateexampure) {
          console.log("True datehajar == dateexampure");
        } else {
          console.log("false datehajar == dateexampure");
        }
        if (datehajar <= dateexamnew) {
          console.log("True  datehajar <= dateexamnew");
        } else {
          console.log("falseee datehajar <= dateexamnew");
        }
        if (datehajar > dateexampure) {
          console.log("truee  datehajar > dateexampure");
        } else {
          console.log("false  datehajar > dateexampure");
        }

        this.certificate = this.userService.AllCertificates.filter((item) =>
          item.bookingid == bookingNum)
        if (this.certificate.length > 0) {
          this.Tostar.info("You Have Completed The Exam");
        } else {
          if ((datehajar == dateexampure) || (datehajar <= dateexamnew)
            && datehajar > dateexampure) {
            Object.keys(course).forEach((i: any) => {
              console.log(parseInt(course[i].courseId))
              this.StartExam(parseInt(course[i].courseId))
            });
          } else {
            this.Tostar.warning("Exam Will Not Start Now")
          }
        }
      });
    });
  }
}