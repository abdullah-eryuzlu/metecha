import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class RecordsService {

    array = [];
    constructor(private authService: AuthenticationService,  private http: HttpClient) { }

    form = new FormGroup({
        userId: new FormControl(null),
        patient: new FormControl('', Validators.required),
        diagnostic: new FormControl('', Validators.required)
    });

    initializeFormGroup() {
        this.form.setValue({
            userId: null,
            patient: 0,
            diagnostic: ''
        });
    }


    getRecords(userId) {
        const req = new HttpRequest("GET", this.authService.getUrl("/api/get_records/" + userId), { withCredentials: true});
        return this.http.request(req);
    }

    addRecords(form){
        const body = {
            userId: form.patient,
            diagnostic: form.diagnostic,
        };
        const req = new HttpRequest("POST", this.authService.getUrl("/api/add_record"), body, { withCredentials: true});
        return this.http.request(req);
    }

    deleteRecord(recordId){
        const req = new HttpRequest("GET", this.authService.getUrl("/api/delete_record/" + recordId), { withCredentials: true});
        return this.http.request(req);
    }

}
