import { Component, OnInit } from '@angular/core';
import {ForgotpasswordService} from '../../shared/forgotpassword.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
    constructor(public service: ForgotpasswordService,
                public route: ActivatedRoute) {
    }
    parameter;

    ngOnInit() {
    }

    onClear() {
        this.service.form2.reset();
        this.service.initializeFormGroup();
    }

    onSubmit() {
        if (this.service.form2.valid) {
          this.parameter = this.route.snapshot.paramMap.get("id");
            this.service.changePassword(this.service.form2.value, this.parameter);
            this.service.form2.reset();
            this.service.initializeFormGroup2();
        }
    }
}
