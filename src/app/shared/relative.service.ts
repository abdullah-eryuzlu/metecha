import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class RelativeService {

    array = [];
    id;
    pw;

    constructor(private authService: AuthenticationService, private http: HttpClient) {}

    form = new FormGroup({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
    });

    initializeFormGroup() {
        this.form.setValue({
            name: '',
            surname: '',
            email: ''
        });
    }

    deleteRelative(userId){
        const req = new HttpRequest("GET", this.authService.getUrl("/api/delete_relation/" + userId), { withCredentials: true});
        setTimeout(()=> {
            window.location.reload();
        });
        return this.http.request(req);

    }

    addRelative(relative){

        this.pw=this.randomPasswordGenerator();
        const body = {
            name: relative.name,
            surname: relative.surname,
            email: relative.email,
            userType: 4,
            password: this.pw
        };
        const req = new HttpRequest("POST", this.authService.getUrl("/api/add_user/"), body, { withCredentials: true});
        return this.http.request(req);
    }

    randomPasswordGenerator(){
        const randomstring = Math.random().toString(36).slice(-8);
        return randomstring;
    }


    getRelatives() {
        const req = new HttpRequest("GET", this.authService.getUrl("/api/get_relations/4"), { withCredentials: true});
        return this.http.request(req);
    }

}
