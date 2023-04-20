import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { Menu } from 'src/app/providers/menu';
import { User } from 'src/app/providers/user';

@Component({
  selector: 'app-mobile-nav-bar',
  templateUrl: './mobile-nav-bar.component.html',
  styleUrls: ['./mobile-nav-bar.component.css']
})
export class MobileNavBarComponent {
  @Input() user: User;
  @Input() menuList: Menu[];

  constructor(public auth: AuthService) {}
}
