import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../shared/authentication.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  constructor(public authService: AuthenticationService) {
  }

  ngOnInit() {

  }

}
