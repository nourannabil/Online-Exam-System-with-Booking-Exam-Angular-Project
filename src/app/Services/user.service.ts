import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private Http: HttpClient, private Spinner: NgxSpinnerService, private Tostar: ToastrService) { }

  CreateCertifiecate(body: any) {
    this.Spinner.show();
    // debugger
    this.Http.post('https://localhost:44324/api/Certificate/', body).subscribe((resp: any) => {
      console.log(resp);
      this.Spinner.hide();
      this.Tostar.success('Certifiecate Created');
    }, err => {
      this.Spinner.hide();
      this.Tostar.error(err.message, err.statuse)
    });
  }

}
