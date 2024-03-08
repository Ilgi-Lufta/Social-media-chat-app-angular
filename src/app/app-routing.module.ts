import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AddMyFirstComponent } from './add-my-first/add-my-first.component';
import { EditMyFirstComponent } from './edit-my-first/edit-my-first.component';
import { DescriptionComponent } from './description/description.component';
import { AppComponent } from './app.component';
import { MyFirstComponentComponent } from './my-first-component/my-first-component.component';
import { WeatherComponent } from './weather/weather.component';
import { MyFirstReactiveFormComponent } from './my-first-reactive-form/my-first-reactive-form.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PostaddComponent } from './postadd/postadd.component';
import { ProfilePhotoAddComponent } from './profile-photo-add/profile-photo-add.component';
import { 
  AuthGuardService as AuthGuard} from './auth-guard.service';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full'},
  // { path: 'add', component: AddMyFirstComponent },
  // { path: 'edit', component: EditMyFirstComponent },
  // { path: 'details', component: DescriptionComponent },
  // { path: 'users', component: MyFirstComponentComponent, 
  // children: 
  // [
  //   { path: 'details/:id', component: DescriptionComponent },
  //   { path: 'edit/:id', component: EditMyFirstComponent }
  // ]},
  // {path: 'weather', component: WeatherComponent},
  // {path: 'reactiveform', component: MyFirstReactiveFormComponent},
  {path: '', component: RegisterComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'homepage/:id', component: HomepageComponent, canActivate: [AuthGuard]},
  {path: 'postAdd/:id', component: PostaddComponent, canActivate: [AuthGuard]},
  {path: 'ProfilePhotoAdd/:id', component: ProfilePhotoAddComponent, canActivate: [AuthGuard]},
  {path: 'chat/:id/:reciverId', component: ChatComponent},
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [
    CommonModule,
    BrowserModule, 
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
