import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from './auth.service';
import { SnackBarService } from '../shared/snack-bar/snack-bar.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  passwordTooltip: string = "Show Password";
  loginForm = new FormGroup({
    'username': new FormControl(null, [Validators.required]),
    'password': new FormControl(null, [Validators.required])
  });

  constructor(private authService: AuthService, private snackbarService: SnackBarService) { }

  ngOnInit(): void {

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

  onSubmit() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
      // .then(user => {
      //   //get user info from user collection using uid
      //   //create session in session storage
      //   //this.authService.createUserSession()
      // }).catch(error => this.authService.handleError(error)) //maybe snackbar should last longer
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

}
