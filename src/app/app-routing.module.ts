import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { PagesListComponent } from './components/pages-list/pages-list.component';
import { AdminGuard } from './guards/admin.guard';
import { SubscriberGuard } from './guards/subscriber.guard';

const routes: Routes = [
  {path: "", component: HomePageComponent, pathMatch: 'full'},
  {path: "login", component: LoginPageComponent},
  {path: "article", component: PagesListComponent, canActivate: [SubscriberGuard]},
  {path: "admin", component: AdminPageComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
