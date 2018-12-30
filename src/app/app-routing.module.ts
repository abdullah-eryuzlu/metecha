import { NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {LoginComponent} from './auth/login/login.component';
import {RecordsGeneralComponent} from './records/records-general/records-general.component';
import {PatientComponent} from './patient/patient.component';
import {PanelComponent} from './panel/panel.component';
import {DoctorComponent} from './doctor/doctor.component';
import {RelativeComponent} from './relative/relative.component';
import {AccountInfoComponent} from './auth/account-info/account-info.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {NewPasswordComponent} from './auth/new-password/new-password.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
    {path: 'records', component: RecordsGeneralComponent},
    {path: 'notifications', component: NotificationsComponent},
    {path: 'panel', component: PanelComponent},
    {path: 'patients', component: PatientComponent},
    {path: 'doctors', component: DoctorComponent},
    {path: 'relative', component: RelativeComponent},
    {path: 'forgot_password/:id', component: NewPasswordComponent},
    {path: 'account', component: AccountInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
