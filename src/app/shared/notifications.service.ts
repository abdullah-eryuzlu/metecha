import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {DatePipe} from '@angular/common';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

    array = [];
    arrayDetailed = [];
    userId;


    constructor(private authService: AuthenticationService, private datePipe: DatePipe, private http: HttpClient) {
    }

    form = new FormGroup({
        userId: new FormControl(null),
        doctor: new FormControl('', Validators.required),
        record: new FormControl('', Validators.required),
        patient: new FormControl('', Validators.required),
    });


    sendNotification(form){
        const body = {
            doctor: form.doctor,
            record: form.record,
            patient: form.patient,
        };
        const req = new HttpRequest("GET", this.authService.getUrl("/api/send_record/"+body.doctor+"/"+body.record),
            body, { withCredentials: true});
        return this.http.request(req);
    }

    initializeFormGroup() {
        this.form.setValue({
            userId: null,
            doctor: '',
            patient: '',
            record: ''
        });
    }

    getNotifications(){
        const req = new HttpRequest("GET", this.authService.getUrl("/api/get_notifications"), { withCredentials: true});
        return this.http.request(req);
    }
    getNotification(notifId){
        const req = new HttpRequest("GET", this.authService.getUrl("/api/get_notification/"+notifId), { withCredentials: true});
        return this.http.request(req);
    }

}

