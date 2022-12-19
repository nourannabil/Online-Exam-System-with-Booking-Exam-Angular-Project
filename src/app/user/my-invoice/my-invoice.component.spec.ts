import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInvoiceComponent } from './my-invoice.component';

describe('MyInvoiceComponent', () => {
  let component: MyInvoiceComponent;
  let fixture: ComponentFixture<MyInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
