import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

    constructor(private authService: AuthenticationService, private http: HttpClient) {
    }

    array = [];


    form = new FormGroup({
        oldpassword: new FormControl('', Validators.required),
        newpassword: new FormControl('', Validators.required),
    });

    changePassword(form) {
        const body = {
            oldPassword: form.oldpassword,
            newPassword: form.newpassword,
        };
        const req = new HttpRequest("POST", this.authService.getUrl("/api/change_password"), body, {withCredentials: true});
        return this.http.request(req);
    }


    initializeFormGroup() {
        this.form.setValue({
            oldpassword: '',
            newpassword: ''
        });
    }
}
