import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './front-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PagesListComponent } from './pages-list/pages-list.component';



const routes: Routes = [
  {
    path: "", 
    component: FrontPageComponent,
    children: [
      { path: 'home', component: HomePageComponent},
      { path: "article", component: PagesListComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'home' }
    ]
  }
];

export const  FrontRoutingModule = RouterModule.forChild(routes);
