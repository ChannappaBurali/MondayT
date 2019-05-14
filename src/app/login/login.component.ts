import { Component, OnInit } from '@angular/core';
import { UserModel } from '../model/userModel';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
  validationMessage = '';
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }
  public user: UserModel;

  ngOnInit() {
    this.user = new UserModel();
  }

  public logIn() {
    this.validationMessage = '';
    if (this.user.UserName && this.user.Password)    {
    this.authenticationService.login(this.user.UserName, this.user.Password).subscribe(res => {
      if (res) {
        this.router.navigate(['/product-list']);
      } else {
        this.validationMessage = 'Invalid username and password.';
    }
    }, error => this.validationMessage = error);
    // (error) => {
    //     this.validationMessage = 'Invalid username and password.';
    // });
  }
  }

}
