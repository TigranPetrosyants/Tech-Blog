import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './front-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PagesListComponent } from '../pages-list/pages-list.component';
import { PagesComponent } from './pages/pages.component';
import { SubscriberGuard } from 'src/app/guards/subscriber.guard';
import { NgModule } from '@angular/core';
import { LoginPageComponent } from '../login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    component: FrontPageComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      {
        path: 'article',
        component: PagesListComponent,
        canActivate: [SubscriberGuard],
      },
      { path: 'pages/:url', component: PagesComponent },
      { path: 'login', component: LoginPageComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'home' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrontRoutingModule {}
