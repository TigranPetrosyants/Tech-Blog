import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { Menu } from 'src/app/interfaces/menu';
import { User } from 'src/app/interfaces/user';
import { MenusService } from 'src/app/services/menus/menus.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  user: User;
  menuList: Menu[];
  mobile = false;

  constructor(public auth: AuthService, private menusService: MenusService) {}
  ngOnInit(): void {
    this.auth.user$.subscribe((user) => (this.user = user));
    this.menusService.getMenus().subscribe((menus) => (this.menuList = menus));
  }
}
