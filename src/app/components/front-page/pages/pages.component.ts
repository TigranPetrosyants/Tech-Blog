import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from 'src/app/providers/menu';
import { Post } from 'src/app/providers/post';
import { MenusService } from 'src/app/services/menus/menus.service';
import { PostService } from 'src/app/services/posts/post.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {
  menu: Menu;
  postList: Post[];

  constructor(
    private route: ActivatedRoute,
    private menus: MenusService,
    private posts: PostService
    ) {
    this.route.params.subscribe(params => {
      this.menus.getConditionalMenus("url", "==", params.url).subscribe(
        menus => {
         if (menus.length) {
          this.menu = menus[0];
          this.posts.getConditionalPosts("menu_id", "==", this.menu.id).subscribe(posts => {
            this.postList = posts;
           })
         }
        }
      )
    })
  }
}
