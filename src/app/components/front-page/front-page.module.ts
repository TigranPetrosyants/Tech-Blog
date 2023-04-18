import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesListComponent } from './pages-list/pages-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FrontRoutingModule } from './front-routing.module';
import { FrontPageComponent } from './front-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../admin-page/material.module';
import { PagesComponent } from './pages/pages.component';



@NgModule({
  declarations: [
    PagesListComponent,
    HomePageComponent,
    FrontPageComponent,
    NavBarComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    FrontRoutingModule,
    MaterialModule
  ]
})
export class FrontPageModule { }
