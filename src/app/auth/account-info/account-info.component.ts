import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {AuthenticationService} from '../../shared/authentication.service';
import {ChangePasswordService} from '../../shared/change-password.service';
import {ChangePasswordComponent} from './change-password/change-password.component';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

    constructor(public authService: AuthenticationService,
                public service: ChangePasswordService,
                public dialog: MatDialog){ }

    listData: MatTableDataSource<any>;
    searchKey: string;
    displayedColumns: string[] = ['id', 'password', 'name', 'surname', 'birthDate'];
    username: string;
    name: string;
    surname: string;
    userType: string;

    ngOnInit() {

        this.authService.getType().subscribe( res=>{
                if(res['status'] == 200){
                    if(res['body']['userType'] == 1){
                        this.userType = "Doctor";
                    }
                    else if(res['body']['userType'] == 2){
                        this.userType = "Nurse";
                    }
                    else if(res['body']['userType'] == 3){
                        this.userType = "Patient";
                    }
                    else if(res['body']['userType'] == 4){
                        this.userType = "Relative";
                    }
                    document.getElementById("username").innerHTML="Username : "+res['body']['username'];
                    document.getElementById("name").innerHTML="Name : "+res['body']['name'];
                    document.getElementById("surname").innerHTML="Surname : "+res['body']['surname'];
                    document.getElementById("userType").innerHTML="User Type : "+this.userType;
                }
            }
        );
    }

    onCreate(){
        this.service.initializeFormGroup();
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '60%';
        this.dialog.open(ChangePasswordComponent, dialogConfig);
    }
    onSearchClear() {
        this.searchKey = '';
    }

    applyFilter() {
        this.listData.filter = this.searchKey.trim().toLowerCase();
    }

}
