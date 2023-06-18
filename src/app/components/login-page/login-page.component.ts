import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { User } from 'src/app/interfaces/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  user: User;

  public signInForm: FormGroup;

  constructor(private fb: FormBuilder, public authService: AuthService) {
    this.signInForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(6)],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => (this.user = user));
  }

  login(): void {
    if (this.signInForm.valid) {
      this.authService.SignIn(
        this.signInForm.controls['email'].value,
        this.signInForm.controls['password'].value
      );
    }
  }
}
