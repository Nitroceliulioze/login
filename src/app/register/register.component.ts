import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fb: FormBuilder, private toastr: ToastrService, private service: AuthService, private router: Router) {}
 //password validation Minimum eight characters, at least one letter and one number:
  registerForm = this.fb.group({
    id: this.fb.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.compose([Validators.required, Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")])),
    email: this.fb.control('', Validators.compose([Validators.required, Validators.email])),
    gender: this.fb.control('female'),
    role: this.fb.control(''),
    isActive: this.fb.control(false)
  })

  onSubmit() {
    if(this.registerForm.valid) {
      this.service.saveUser(this.registerForm.value).subscribe(res=>{
        this.toastr.success('Please concatc admin for enableing access','Registered Successfully')
        this.router.navigate(['login'])
      })
    } else {
      this.toastr.warning('Please enter valid data');
    }
  }
}
