import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PatientComponent } from './patient/patient.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { PanelComponent } from './panel/panel.component';
import { AccountInfoComponent } from './auth/account-info/account-info.component';
import {MatTableModule, MatPaginatorModule, MatSortModule} from '@angular/material';
import { AddPatientComponent } from './patient/add-update-patient/add-patient.component';
import {PatientService} from './shared/patient.service';
import {DatePipe} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { DoctorComponent } from './doctor/doctor.component';
import {RecordsGeneralComponent} from './records/records-general/records-general.component';
import {RecordsService} from './shared/records.service';
import { AuthorizeNurseComponent } from './nurse/authorize-nurse/authorize-nurse.component';
import {NurseService} from './shared/nurse.service';
import { AuthorizeDoctorComponent } from './doctor/authorize-doctor/authorize-doctor.component';
import {DoctorService} from './shared/doctor.service';
import { RelativeComponent } from './relative/relative.component';
import { AuthorizeRelativeComponent } from './relative/authorize-relative/authorize-relative.component';
import {RelativeService} from './shared/relative.service';
import {HttpClientModule} from '@angular/common/http';
import { ChangePasswordComponent } from './auth/account-info/change-password/change-password.component';
import { RecordsComponent } from './patient/records/records.component';
import { AddRecordComponent } from './patient/add-record/add-record.component';
import { RelativeSuccessMessageComponent } from './relative/relative-success-message/relative-success-message.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationDetailComponent } from './notifications/notification-detail/notification-detail.component';
import { SendNotificationComponent } from './notifications/send-notification/send-notification.component';
import { AuthorizedNursesComponent } from './patient/authorized-nurses/authorized-nurses.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './auth/new-password/new-password.component';
import { AddPatientSuccessMessageComponent } from './patient/add-patient-success-message/add-patient-success-message.component';

@NgModule({
  declarations: [
    AppComponent,
      RecordsComponent,
      AddRecordComponent,
    LoginComponent,
    NavbarComponent,
    PatientComponent,
    RecordsGeneralComponent,
    WelcomeComponent,
    PanelComponent,
    AccountInfoComponent,
    PanelComponent,
      AddPatientComponent,
      DoctorComponent,
      AuthorizeNurseComponent,
      AuthorizeDoctorComponent,
      RelativeComponent,
      AuthorizeRelativeComponent,
      ChangePasswordComponent,
      RelativeSuccessMessageComponent,
      NotificationsComponent,
      NotificationDetailComponent,
      SendNotificationComponent,
      AuthorizedNursesComponent,
      ForgotPasswordComponent,
      NewPasswordComponent,
      AddPatientSuccessMessageComponent,
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
      MaterialModule,
      ReactiveFormsModule,
      FormsModule,
  ], entryComponents: [AddPatientComponent, AuthorizeDoctorComponent, AuthorizeNurseComponent, AuthorizeRelativeComponent,
        ChangePasswordComponent, RecordsComponent,
        AddRecordComponent, RelativeSuccessMessageComponent, SendNotificationComponent,
        AuthorizedNursesComponent, NotificationDetailComponent, ForgotPasswordComponent, AddPatientSuccessMessageComponent],
  providers: [PatientService, RecordsService, RelativeService, DoctorService, NurseService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
