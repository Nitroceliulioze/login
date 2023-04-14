import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css'],
})
export class UpdatepopupComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<UpdatepopupComponent>
  ) {}

  registerForm = this.fb.group({
    id: this.fb.control(''),
    name: this.fb.control(''),
    password: this.fb.control(''),
    email: this.fb.control(''),
    gender: this.fb.control('female'),
    role: this.fb.control('', Validators.required),
    isActive: this.fb.control(false),
  });

  rolelist: any;
  editdata: any;

  ngOnInit(): void {
    this.service.getAllRole().subscribe((res) => {
      this.rolelist = res;
    });
    if (this.data.usercode != null && this.data.usercode != '') {
      this.service.getByCode(this.data.usercode).subscribe((res) => {
        this.editdata = res;
        this.registerForm.setValue({
          id: this.editdata.id,
          name: this.editdata.name,
          email: this.editdata.email,
          password: this.editdata.password,
          gender: this.editdata.gender,
          role: this.editdata.role,
          isActive: this.editdata.isActive,
        });
      });
    }
  }


  updateUser() {
    if(this.registerForm.valid) {
      this.service.updateUser(this.registerForm.value.id, this.registerForm.value).subscribe(res => {
        this.toastr.success('User has been updated');
        this.dialog.close();
      })
    } else {
      this.toastr.warning('Please Select Role')
    }

  }
}
