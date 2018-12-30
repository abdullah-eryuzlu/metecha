import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource} from '@angular/material';
import {RecordsService} from '../../shared/records.service';
import {AuthenticationService} from '../../shared/authentication.service';

@Component({
  selector: 'app-records-general',
  templateUrl: './records-general.component.html',
  styleUrls: ['./records-general.component.css']
})
export class RecordsGeneralComponent implements OnInit {
    constructor(public service: RecordsService,
                public authService: AuthenticationService) {}

    listData: MatTableDataSource<any>;
    searchKey: string;
    displayedColumns: string[] = ['patientName', 'diagnostic',];
    array = [];

    usersname:string;
    userssurname:string;
    isLogin:boolean;
    userType;
    ngOnInit() {
        this.authService.getType().subscribe(res => {
            if(res['status']  == 200){
                this.usersname=res['body']['name'];
                this.userssurname=res['body']['surname'];
                this.isLogin=true;
                this.userType = res['body']['userType'];
                if(this.isLogin != true){
                    window.location.href='/login';
                }
                if(this.userType != 3){
                    window.location.href='';
                }
                this.service.getRecords(this.authService.userId).subscribe(ress => {
                    if (ress['status']  == 200) {
                        this.service.array = ress['body'];
                        this.listData = new MatTableDataSource<any>(this.service.array);
                    } else if (ress['status']  === 204 || ress['status']  === undefined) {

                    } else {
                    }
                });
                this.listData = new MatTableDataSource<any>(this.service.array);
            }
            else if(res['status']  == 204 || res['status']  == undefined){

            }
            else {

            }
        });

    }


    onSearchClear() {
        this.searchKey = '';
    }

    applyFilter() {
        this.listData.filter = this.searchKey.trim().toLowerCase();
    }


    onDelete($key) {
        if (confirm('Are you sure to delete this record?')) {
            this.service.deleteRecord($key);
        }
    }
}
