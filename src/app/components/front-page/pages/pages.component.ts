import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from 'src/app/interfaces/menu';
import { Post } from 'src/app/interfaces/post';
import { MenusService } from 'src/app/services/menus/menus.service';
import { PostService } from 'src/app/services/posts/post.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent {
  menu: Menu;
  postList: Post[];

  constructor(
    private route: ActivatedRoute,
    private menusService: MenusService,
    private postsService: PostService
  ) {
    this.route.params.subscribe((params) => {
      this.menusService
        .getConditionalMenus('url', '==', params.url)
        .subscribe((menus) => {
          if (menus.length) {
            this.menu = menus[0];
            this.postsService
              .getConditionalPosts('menu_id', '==', this.menu.id)
              .subscribe((posts) => {
                this.postList = posts;
              });
          }
        });
    });
  }
}
