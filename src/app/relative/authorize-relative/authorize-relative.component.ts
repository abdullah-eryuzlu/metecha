import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {RelativeService} from '../../shared/relative.service';
import {RelativeSuccessMessageComponent} from '../relative-success-message/relative-success-message.component';

@Component({
  selector: 'app-authorize-relative',
  templateUrl: './authorize-relative.component.html',
  styleUrls: ['./authorize-relative.component.css']
})
export class AuthorizeRelativeComponent implements OnInit {

    username;
    constructor(public service: RelativeService,
                public dialogRef: MatDialogRef<AuthorizeRelativeComponent>,
                public dialog: MatDialog) { }

    ngOnInit() {
    }

    onClear() {
        this.service.form.reset();
        this.service.initializeFormGroup();
    }
    onSubmit() {
        if (this.service.form.valid) {
            this.service.addRelative(this.service.form.value).subscribe(res => {
                if(res['status'] == 200){
                    this.service.id = res['body']['username'];
                    const dialogConfig = new MatDialogConfig();
                    dialogConfig.disableClose = true;
                    dialogConfig.autoFocus = true;
                    dialogConfig.width = '30%';
                    dialogConfig.height = '25%';
                    const dialogRef: MatDialogRef<RelativeSuccessMessageComponent> =
                        this.dialog.open(RelativeSuccessMessageComponent, dialogConfig);
                    dialogRef.componentInstance.username = this.service.id;
                    dialogRef.componentInstance.password = this.service.pw;
                }
                else if(res['status']  == 204 || res['status']  == undefined){

                }
                else{

                }
            });
            this.service.form.reset();
            this.service.initializeFormGroup();



        }

    }


    onClose() {
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.dialogRef.close();
    }

}
