import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class PatientService {

    array = [];

    id;
    pw;
    userId;


    constructor(private authService: AuthenticationService, private datePipe: DatePipe, private http: HttpClient) {
       }

    form = new FormGroup({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
    });
    randomPasswordGenerator(){
        const randomstring = Math.random().toString(36).slice(-8);
        return randomstring;
    }

    addPatient(patient){
        this.pw = this.randomPasswordGenerator();
        const body = {
            name: patient.name,
            surname: patient.surname,
            email: patient.email,
            userType: 3,
            password: this.pw,
        };
        const req = new HttpRequest("POST", this.authService.getUrl("/api/add_user"), body, { withCredentials: true});
        return this.http.request(req);
    }



    initializeFormGroup() {
        this.form.setValue({
            name: '',
            surname: '',
            email: ''
        });
    }

    getAuthorizedPatients(){
        const req = new HttpRequest("GET", this.authService.getUrl("/api/get_relations/3"), { withCredentials: true});
        return this.http.request(req);
    }
    getPatients(){
        const req = new HttpRequest("GET", this.authService.getUrl("/api/get_users/3"), { withCredentials: true});
        return this.http.request(req);
    }
    deletePatient(userId){
        const req = new HttpRequest("GET", this.authService.getUrl("/api/delete_user/" + userId), { withCredentials: true});
        return this.http.request(req);
    }
}
