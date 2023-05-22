import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesListComponent } from '../pages-list/pages-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FrontRoutingModule } from './front-routing.module';
import { FrontPageComponent } from './front-page.component';
import { MaterialModule } from 'src/app/material.module';
import { PagesComponent } from './pages/pages.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    PagesListComponent,
    HomePageComponent,
    FrontPageComponent,
    NavBarComponent,
    PagesComponent,
  ],
  imports: [CommonModule, FrontRoutingModule, MaterialModule, FlexLayoutModule],
})
export class FrontPageModule {}
