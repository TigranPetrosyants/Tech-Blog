import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminPageComponent } from './admin-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MenusComponent } from './menus/menus.component';
import { PostsComponent } from './posts/posts.component';



@NgModule({
  declarations: [
    DashboardComponent, 
    AdminPageComponent,
    NavBarComponent,
    MenusComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule
  ]
})
export class AdminPageModule { }
