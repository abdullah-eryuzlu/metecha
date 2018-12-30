import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthorizedDoctorService {


    constructor(private authService: AuthenticationService, private http: HttpClient) { }

    array = [];


    form = new FormGroup({
        userId: new FormControl(null),
        doctor: new FormControl('', Validators.required),
    });

    addDoctor(doctor){
        const body = {
            userId: doctor.doctor,
        };
        const req = new HttpRequest("POST", this.authService.getUrl("/api/add_relation/"), body, { withCredentials: true});
        return this.http.request(req);
    }



    initializeFormGroup() {
        this.form.setValue({
            userId: null,
            doctor: ''
        });
    }
    getDoctors(){
        const req = new HttpRequest("GET", this.authService.getUrl("/api/get_users/1"), { withCredentials: true});
        return this.http.request(req);
    }


}
