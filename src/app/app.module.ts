import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { ContactService } from '../services/contact.service';
import { AuthService } from '../services/auth.service';
import { AuthGuardService } from '../services/auth-guard.service';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ContactService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
