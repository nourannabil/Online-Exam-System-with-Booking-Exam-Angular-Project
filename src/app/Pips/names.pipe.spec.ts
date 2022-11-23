
import { AdminService } from '../Services/admin.service';
import {inject} from '@angular/core/testing'
import { NamesPipe } from './names.pipe';

describe('NamesPipe', () => {
  it('create an instance', inject([AdminService], (admin: AdminService)  => {
    const pipe = new NamesPipe(admin);
    expect(pipe).toBeTruthy();
  }));
});
