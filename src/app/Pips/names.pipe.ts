import { Pipe, PipeTransform } from '@angular/core';
import { AdminService } from '../Services/admin.service';

@Pipe({
  name: 'names'
  
})
export class NamesPipe implements PipeTransform {
  constructor(public admin:AdminService){};
  transform(statusid:number, statusname:string): string {
    const statusasname = this.admin.status.find(status => status.statusid === statusid);
    return statusasname ? statusasname.statusname : "";
  }

}
