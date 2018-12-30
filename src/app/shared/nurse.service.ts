import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';
import {DatePipe} from '@angular/common';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
@Injectable({
    providedIn: 'root'
})
export class NurseService {

    array = [];
    arrayAuthorized = [];

    constructor(private http: HttpClient, private authService: AuthenticationService) {
    }

    form = new FormGroup({
        $key: new FormControl(null),
        patient: new FormControl('', Validators.required),
        nurse: new FormControl('', Validators.required)
    });

    initializeFormGroup() {
        this.form.setValue({
            $key: null,
            fullName: ''
        });
    }

    getNurses(){
        const req = new HttpRequest("GET", this.authService.getUrl("/api/get_users/2"), { withCredentials: true});
        return this.http.request(req);
    }

    deleteAuthorizedNurse(patientId, nurseId){
        const req = new HttpRequest("GET", this.authService.getUrl("/api/delete_relation_others/"+nurseId+"/"+patientId), { withCredentials: true});
        return this.http.request(req);
    }

    getAuthorizedNurses(userId){
        const req = new HttpRequest("GET", this.authService.getUrl("/api/get_relations_others/" + userId), { withCredentials: true});
        return this.http.request(req);
    }

}
