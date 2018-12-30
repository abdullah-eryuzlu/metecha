import {Injectable, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
@Injectable({
    providedIn: 'root'
})
export class DoctorService implements OnInit {

    constructor(private http: HttpClient, private authService: AuthenticationService){
    }
    array = [];



    ngOnInit(){

    }

    deleteDoctor(userId){
        const req = new HttpRequest("GET", this.authService.getUrl("/api/delete_relation/" + userId), { withCredentials: true});
        return this.http.request(req);
    }

    getAuthorizedDoctors(){
        const req = new HttpRequest("GET", this.authService.getUrl("/api/get_relations/1"), { withCredentials: true});
        return this.http.request(req);
    }
    getDoctors(){
        const req = new HttpRequest("GET", this.authService.getUrl("/api/get_users/1"), { withCredentials: true});
        return this.http.request(req);
    }
}
