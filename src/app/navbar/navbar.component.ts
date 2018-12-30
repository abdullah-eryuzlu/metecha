import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../shared/authentication.service';
import {NurseService} from '../shared/nurse.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



    constructor(public nurseService: NurseService,
                public authService: AuthenticationService) { }

  ngOnInit() {

  }

    onLogout(){
        this.authService.logOut().subscribe(res => {
            setTimeout(function () {
                window.location.href="/login";
            }, 500);
        });
    }
}
