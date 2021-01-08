import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  passwordTooltip: string = "Show Password"; 
  constructor() { }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  showPassword() {
    let currInputType = document.getElementById('pass-input').attributes['type'].value
    if (currInputType == 'password') {
      document.getElementById('pass-input').attributes['type'].value = 'text'
      this.passwordTooltip = "Hide Password"
    } else {
      document.getElementById('pass-input').attributes['type'].value = 'password'
      this.passwordTooltip = "Show Password"
    }
  }

  // setRedirectUrl() {
  //   if (this.route.snapshot.queryParams && this.route.snapshot.queryParams.return) {
  //     this.redirectUrl = this.route.snapshot.queryParams.return;
  //   }
  // }

  autoLogin() {
    // let user = this.userService.getUserSession();
    // if (user && this.redirectUrl)
    //   this.router.navigateByUrl(this.redirectUrl);
    // if (user && !this.redirectUrl)
    //   user.isNewUser ? this.router.navigate(['mughub/welcome']) : this.router.navigate(['mughub', user.type]);
  }

  onSubmit() {
    //this.authService.login(this.loginForm.value, this.redirectUrl);
  }
}
