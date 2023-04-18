import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { User } from 'src/app/providers/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user: User;

  constructor(public auth: AuthService) {
  }
  ngOnInit(): void {
    this.auth.user$.subscribe(user => this.user = user)
  }
}
