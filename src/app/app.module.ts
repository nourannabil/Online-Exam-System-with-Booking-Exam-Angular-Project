import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExamsComponent } from './exams/exams.component';
import { SharedModule } from './shared/shared.module';
import { ExamsCardsComponent } from './exams-cards/exams-cards.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { TestimonialCardsComponent } from './testimonial-cards/testimonial-cards.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { CourseExamsComponent } from './course-exams/course-exams.component';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EaxamInfoCardComponent } from './eaxam-info-card/eaxam-info-card.component';
import { NamesPipe } from './Pips/names.pipe';
import { TokenInterceptor } from 'src/interceptor/token.interceptor';








@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutusComponent,
    ContactusComponent,
    ExamsComponent,
    ExamsCardsComponent,
    CoursesComponent,
    CourseCardComponent,
    TestimonialCardsComponent,
    TestimonialComponent,
    CourseExamsComponent,
    EaxamInfoCardComponent,
    NamesPipe,






  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
