import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {RelativeService} from '../shared/relative.service';
import {AuthorizeRelativeComponent} from './authorize-relative/authorize-relative.component';
import {AuthenticationService} from '../shared/authentication.service';

@Component({
  selector: 'app-relative',
  templateUrl: './relative.component.html',
  styleUrls: ['./relative.component.css']
})
export class RelativeComponent implements OnInit {

    constructor(public service: RelativeService,
                public authService: AuthenticationService,
                public dialog: MatDialog) { }

    listData: MatTableDataSource<any>;
    searchKey: string;
    displayedColumns: string[] = ['name', 'surname', 'actions'];

    ngOnInit() {
        this.service.getRelatives().subscribe(res => {
            if (res['status'] == 200) {
                this.service.array = res['body'];
                this.listData = new MatTableDataSource<any>(this.service.array);
            }
            else if (res['status'] == 204 || res['status'] == undefined) {

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

    onCreate(){
        this.service.initializeFormGroup();
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '60%';
        this.dialog.open(AuthorizeRelativeComponent, dialogConfig);
    }
    onDelete(userId){
        this.service.deleteRelative(userId);
    }

}
