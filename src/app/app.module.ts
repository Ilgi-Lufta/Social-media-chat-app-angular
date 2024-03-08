import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MyFirstComponentComponent } from './my-first-component/my-first-component.component';
import { HeaderComponent } from './header/header.component';
import { MyFirstServiceService } from './my-first-component/my-first-service.service';
import { AddMyFirstComponent } from './add-my-first/add-my-first.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditMyFirstComponent } from './edit-my-first/edit-my-first.component';
import { DescriptionComponent } from './description/description.component';
import { MyFirstReactiveFormComponent } from './my-first-reactive-form/my-first-reactive-form.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './weather/weather.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PostaddComponent } from './postadd/postadd.component';
import { ProfilePhotoAddComponent } from './profile-photo-add/profile-photo-add.component';
import { PhotoPipe } from './pipes/PhotoPipe';
import { NoopInterceptor } from './Interceptors/noop-interceptor';
import { ChatComponent } from './chat/chat.component';



@NgModule({
  declarations: [
    AppComponent,
    MyFirstComponentComponent,
    HeaderComponent,
    AddMyFirstComponent,
    EditMyFirstComponent,
    DescriptionComponent,
    MyFirstReactiveFormComponent,
    WeatherComponent,
    RegisterComponent,
    LoginComponent,
    HomepageComponent,
    PostaddComponent,
    ProfilePhotoAddComponent,
    PhotoPipe,
    ChatComponent
  ],
  imports: [
    BrowserModule,FormsModule ,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [MyFirstServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
