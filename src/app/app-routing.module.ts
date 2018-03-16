import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { ContactsModule } from './contacts/contacts.module';

const app_routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
  { path: 'auth/login', component : LoginComponent},
  { path: 'auth/signup',component : SignupComponent},
  { path: 'contacts', loadChildren :   () => ContactsModule }
   
];

@NgModule({
  imports: [ RouterModule.forRoot(app_routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
