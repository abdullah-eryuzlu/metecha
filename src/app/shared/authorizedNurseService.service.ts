import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizedNurseServiceService {

    constructor(private authService: AuthenticationService, private http: HttpClient) { }

    array = [];
    form = new FormGroup({
        userId: new FormControl(null),
        nurse: new FormControl('', Validators.required),
        patient: new FormControl('', Validators.required),
    });


    authorizeNurse(form){
        const body = {
            fromId: form.nurse,
            userId: form.patient,
        };
        const req = new HttpRequest("POST", this.authService.getUrl("/api/add_relation_others"), body, { withCredentials: true});
        return this.http.request(req);
    }

    initializeFormGroup() {
        this.form.setValue({
            userId: null,
            patient: 0,
            nurse: 0
        });
    }

    getAuthorizedNurses() {
        const req = new HttpRequest("GET", this.authService.getUrl("/api/get_relations/2"), { withCredentials: true});
        return this.http.request(req);
    }


}