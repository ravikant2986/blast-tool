import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {Router} from '@angular/router';

@Injectable()

export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }
 
  canActivate(){

  	if(this.auth.isAuthenticated()){

  		return true;
  	}
  	else{

  		this.router.navigate(['/auth/login']);
  	}

  }
 
}