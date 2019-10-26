import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  credentails: TokenPayload = {
    _id: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: 0,
    gender: true,
    birthday: new Date()
  };

  constructor(
    private auth: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit() {

  }
  register() {
    this.auth.register(this.credentails).subscribe(
      () => {
        this.router.navigateByUrl('/profile');
      },
      err => {
        console.error(err);
      }
    );
  }
}
