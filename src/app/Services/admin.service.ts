import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
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
  statusNameColumn:any[]=[];
  certificates:any[]=[];
  Roles:any[]=[];
  users:any[]=[];
  display_image:any;
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
      this.toastr.error(err.message, err.status)
    })
  }

  getAllExams() {
    this.spinner.show();
    this.http.get('https://localhost:44371/api/exam').subscribe((resp: any) => {

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
    this.http.get('https://localhost:44371/api/status').subscribe((resp: any) => {
      this.status = resp;
      for(let i=0; i<this.status.length;i++)
      {if(this.status[i].statusid==5 ||this.status[i].statusid==6 )
        this.statusNameColumn.push(this.status[i].statusname)
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
    this.http.get('https://localhost:44371/api/booking').subscribe((resp: any) => {
      this.allBookings = resp;
  
      // this.AllBookingArray = this.allBookings.map(booking => ({
      //   bookingid: booking.bookingid,
      //   examdateuser: booking.examdateuser,
      //   bookingdate: booking.bookingdate,
      //   exampassword: booking.exampassword,
      //   examid: this.exams.find(exam => exam.examid === booking.examid).name,
      //   userid: booking.userid,
      //   statusid: this.status.find( status => status.statusid === booking.statusid).statusname
  
      // }));
  
  
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
    this.http.post('https://localhost:44371/api/booking/',body).subscribe((resp: any) => {
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
    this.http.put('https://localhost:44371/api/booking',body).subscribe((resp: any) => {
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Updated Successfully!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
  
    })
  
  }
  deleteBooking(id:number) {
    debugger
    this.spinner.show();
    this.http.delete('https://localhost:44371/api/booking/Delete/'+id).subscribe((resp: any) => {
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
  GetAllCertificate(){
      //1.show spinner
      //2.hit on api
      //3.hide spinner
      //4. resp =>toastr
      this.spinner.show();
      this.http.get('https://localhost:44371/api/certificate').subscribe((resp:any)=>{
        this.certificates=resp;
        console.log(resp);
        this.spinner.hide();
        this.toastr.success('Data Retreived!')
        },err=>{
          this.spinner.hide();
          this.toastr.error(err.message,err.status)
        
      })
  }
  CreateCertificate(body:any){
    this.spinner.show();
    this.http.post('https://localhost:44371/api/certificate/',body).subscribe((resp:any)=>{
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Created Successfully!')
      },err=>{
        this.spinner.hide();
        this.toastr.error(err.message,err.status)
      
    })
}
UpdateCertificate(body:any){
  debugger
  this.spinner.show();
  this.http.put('https://localhost:44371/api/certificate',body).subscribe((resp:any)=>{
    console.log(resp);
    this.spinner.hide();
    this.toastr.success('Updated Successfully!')
    },err=>{
      this.spinner.hide();
      this.toastr.error(err.message,err.status)
    
  })
}

DeleteCertificate(id:number){
  this.spinner.show();
  this.http.delete('https://localhost:44371/api/certificate/delete/'+id).subscribe((resp:any)=>{
    console.log(resp);
    this.spinner.hide();
    this.toastr.success('Deleted Successfully!')
    },err=>{
      this.spinner.hide();
      this.toastr.error(err.message,err.status)
    
  })
}

 // =============================== End MANAGE CERTIFICATE TABLE ====================================== 

  // ===============================  MANAGE Role TABLE ====================================== 

  GetAllRole(){
    //1.show spinner
    //2.hit on api
    //3.hide spinner
    //4. resp =>toastr
    this.spinner.show();
    this.http.get('https://localhost:44371/api/role').subscribe((resp:any)=>{
      this.Roles=resp;
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Data Retreived!')
      },err=>{
        this.spinner.hide();
        this.toastr.error(err.message,err.status)
      
    })
}

CreateRole(body:any){
  this.spinner.show();
  this.http.post('https://localhost:44371/api/role',body).subscribe((resp:any)=>{
    console.log(resp);
    this.spinner.hide();
    this.toastr.success('Created Successfully!')
    },err=>{
      this.spinner.hide();
      this.toastr.error(err.message,err.status)
    
  })
}
UpdateRole(body:any){
  this.spinner.show();
  this.http.put('https://localhost:44371/api/role',body).subscribe((resp:any)=>{
    console.log(resp);
    this.spinner.hide();
    this.toastr.success('Updated Successfully!')
    },err=>{
      this.spinner.hide();
      this.toastr.error(err.message,err.status)
    
  })
}


DeleteRole(id:number){
  this.spinner.show();
  this.http.delete('https://localhost:44371/api/role/delete/'+id).subscribe((resp:any)=>{
    console.log(resp);
    this.spinner.hide();
    this.toastr.success('Deleted Successfully!')
    },err=>{
      this.spinner.hide();
      this.toastr.error(err.message,err.status)
    
  })
}


 // =============================== END MANAGE Role TABLE ====================================== 


 // ===============================  MANAGE USERS TABLE ====================================== 

 GetAllUsers(){
    //1.show spinner
    //2.hit on api
    //3.hide spinner
    //4. resp =>toastr
    this.spinner.show();
    this.http.get('https://localhost:44371/api/user').subscribe((resp:any)=>{
      this.users=resp;
      console.log(resp);
      this.spinner.hide();
      this.toastr.success('Data Retreived!')
      },err=>{
        this.spinner.hide();
        this.toastr.error(err.message,err.status)
      
    })
}
uploadAttachment(file:FormData){
  debugger
  this.http.post('https://localhost:44371/api/user/UplodeImage/',file).subscribe((resp :any)=>{
    this.display_image=resp.imagepath;
  },err=>{
    this.toastr.error('cant upload image')
    console.log(err);
  })


}

CreateUsers(body:any){
  debugger
  body.imagepath=this.display_image
  this.spinner.show();
  this.http.post('https://localhost:44371/api/user/',body).subscribe((resp:any)=>{
    console.log(resp);
    this.spinner.hide();
    this.toastr.success('Created Successfully!')
    },err=>{
      this.spinner.hide();
      this.toastr.error(err.message,err.status)
    
  })
}



}

