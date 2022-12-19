import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private Http: HttpClient, private Spinner: NgxSpinnerService, private Tostar: ToastrService) { }

preuserdata={};
  myBooking: any[] = [];
  myCertifiecate: any[] = [];
  myInvoice: any[] = [];

  mySingleBooking: any[] = [];
  mySingleCertifiecate: any[] = [];
  AllCertificates: any[] = [];

  myProfile: any = {};
  display_image: any;
  myProfilePass: any = {};

  MyBooking(id: number) {
    this.Spinner.show();
    this.Http.get('https://localhost:44324/api/Booking/GetMyBooking/' + id).subscribe((resp: any) => {
      this.myBooking = resp;
      console.log(this.myBooking);
      this.Spinner.hide();
      this.Tostar.success('My Booking');
    }, err => {
      this.Spinner.hide();
      this.Tostar.error(err.message, err.statuse);
    });
  }

  PassCertifiecate: any[] = [];
  MyCertifiecate(id: number) {
    this.Spinner.show();
    this.Http.get('https://localhost:44324/api/Certificate/GetMyCertificate/' + id).subscribe((resp: any) => {
      this.myCertifiecate = resp;
      console.log(this.myCertifiecate);
      this.PassCertifiecate = this.myCertifiecate.filter((item) => item.title === "PROFESSIONAL CERTIFICATE");
      console.log(this.PassCertifiecate);
      this.Spinner.hide();
      this.Tostar.success('My Certifiecate');
    }, err => {
      this.Spinner.hide();
      this.Tostar.error(err.message, err.statuse);
    });
  }

  CreateCertifiecate(body: any) {
    this.Spinner.show();
    this.Http.post('https://localhost:44324/api/Certificate/', body).subscribe((resp: any) => {
      console.log(resp);
      this.Spinner.hide();
      this.Tostar.success('Certifiecate Created');
    }, err => {
      this.Spinner.hide();
      this.Tostar.error(err.message, err.statuse);
    });
  }

  CreateFalidCertifiecate(body: any) {
    this.Spinner.show();
    this.Http.post('https://localhost:44324/api/Certificate/', body).subscribe((resp: any) => {
      console.log(resp);
      this.Spinner.hide();
    }, err => {
      this.Spinner.hide();
    });
  }

  MyInvoice(id: number) {
    this.Spinner.show();
    this.Http.get('https://localhost:44324/api/Invoice/GetUserInvoice/' + id).subscribe((resp: any) => {
      this.myInvoice = resp;
      //console.log(this.myInvoice);
      this.Spinner.hide();
      this.Tostar.success('My Invoice');
    }, err => {
      this.Spinner.hide();
      this.Tostar.error(err.message, err.statuse);
    });
  }
  /////////////////////////////////////////////////////////

  CreateFeedBack(body: any) {
    this.Spinner.show();
    this.Http.post('https://localhost:44324/api/Testimonial', body).subscribe((resp: any) => {
      this.Spinner.hide();
      this.Tostar.success("Thank For your FeedBack");
    }, err => {
      this.Spinner.hide();
      this.Tostar.error(err.masseage, err.status);
    })
  }

  /////////////////////////////////////////////////////////

  MyProfile(id: number) {
    this.Spinner.show();
    this.Http.get('https://localhost:44324/api/User/GetMyProfile/' + id).subscribe((resp: any) => {
      this.myProfile = resp;
      console.log(this.myProfile);
      this.Spinner.hide();
      this.Tostar.success("My Profile");
    }, err => {
      this.Spinner.hide();
      this.Tostar.error(err.message, err.statuse);
    })
  }

  EditProfile(body: any) {
    body.imagepath = this.display_image;
    this.Spinner.show();
    this.Http.put('https://localhost:44324/api/User/', body).subscribe((resp) => {
      console.log(`this is resp${resp}`)
      this.Spinner.hide();
      this.Tostar.show('Updated')
    }, err => {
      this.Spinner.hide();
      this.Tostar.error(err.masseage, err.status);
    })
  }

  UserImage(file: FormData) {
    this.Http.post('https://localhost:44324/api/User/UplodeImage/', file).subscribe((resp: any) => {
      this.display_image = resp.imagepath;
    }, err => {
      this.Tostar.error('Can not Upload Image');
      console.log(err);
    })
  }


  /////////////////////////////////////////////////////////////////////////////////

  AllAdminCertifiecate: any[] = [];
  GetAllCertificate() {
    this.Spinner.show();
    this.Http.get('https://localhost:44324/api/Certificate').subscribe((resp: any) => {
      this.AllCertificates = resp;
      this.AllAdminCertifiecate = this.AllCertificates.filter((item) => item.title === "PROFESSIONAL CERTIFICATE");
      console.log(this.AllAdminCertifiecate);
      this.Spinner.hide();
      this.Tostar.success("success");
    }, err => {
      this.Spinner.hide();
      this.Tostar.error(err.masseage, err.status);
    });
  }


}
