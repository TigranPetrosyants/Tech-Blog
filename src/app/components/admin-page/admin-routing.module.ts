import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenusComponent } from './menus/menus.component';
import { PostsComponent } from './posts/posts.component';


const routes: Routes = [
  {
    path: "", 
    component: AdminPageComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'menus', component: MenusComponent},
      { path: 'posts', component: PostsComponent },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: '**', pathMatch: 'full', redirectTo: 'dashboard' }
    ]
  }
];

export const  AdminRoutingModule = RouterModule.forChild(routes);
