import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { Menu } from 'src/app/providers/menu';
import { User } from 'src/app/providers/user';
import { MenusService } from 'src/app/services/menus/menus.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user: User;
  menuList: Menu[];

  constructor(
    public auth: AuthService,
    private menus: MenusService
    ) {
  }
  ngOnInit(): void {
    this.auth.user$.subscribe(user => this.user = user);
    this.menus.getMenus().subscribe(menus => this.menuList = menus);
  }
}
