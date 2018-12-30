import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

    constructor(private authService: AuthenticationService, private http: HttpClient) {
    }

    array = [];


    form = new FormGroup({
        email: new FormControl('', Validators.required),
    });
    form2 = new FormGroup({
        newPassword: new FormControl('', Validators.required),
    });

    sendEmail(form) {
        const body = {
            email: form.email,
        };
        const req = new HttpRequest("GET", this.authService.getUrl("/public/request/change_password/"+body.email), {withCredentials: true});
        return this.http.request(req);
    }
    changePassword(form2, id){
        const body = {
            newPassword: form2.newPassword,
        };
        const req = new HttpRequest("POST", this.authService.getUrl("/public/change_password/"+id), body, {withCredentials: true});
        return this.http.request(req);
    }


    initializeFormGroup() {
        this.form.setValue({
            email: ''
        });
    }
    initializeFormGroup2() {
        this.form.setValue({
            newpassword: ''
        });
    }

}
