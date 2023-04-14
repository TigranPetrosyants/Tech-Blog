import { Component } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {


  constructor(public auth: AuthService) {
  }

  login(): void {
      this.auth.loginWithGoogle();
  }

}
