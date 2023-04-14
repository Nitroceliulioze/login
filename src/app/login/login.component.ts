import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userData: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    username: this.fb.control('', Validators.required),
    password: this.fb.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
  });

  onSubmit() {
    // if(this.loginForm.valid) {
    //   this.service.saveUser(this.loginForm.value).subscribe(res=>{
    //     this.toastr.success('Please contact admin for enableing access','Registered Successfully')
    //     this.router.navigate(['login'])
    //   })
    // } else {
    //   this.toastr.warning('Please enter valid data');
    // }
    this.service.getByCode(this.loginForm.value.username).subscribe((res) => {
      this.userData = res;
      console.log(this.userData);
      if (this.userData.password === this.loginForm.value.password) {
        if (this.userData.isActive) {
          sessionStorage.setItem('userName', this.userData.id);
          sessionStorage.setItem('userRole', this.userData.role);
          this.router.navigate(['']);
        } else {
          this.toastr.error('Please contact admin', 'Inactive user');
        }
      } else {
        this.toastr.error('Invalid credentials');
      }
    });
  }
}
