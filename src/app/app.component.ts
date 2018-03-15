import { Component} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {Router} from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  	subscription: Subscription;
  	user;

    constructor(private router: Router, private auth : AuthService) { 
 		 
      	var userObject = localStorage.getItem('user');
      	this.user = JSON.parse(userObject);

        if(this.user){
            this.auth.setLoginStatus(true);
        }

    }

    logout(){
  
    	this.auth.logOut();
    	this.auth.setLoginStatus(false);
    	this.router.navigate(['/auth/login']);
    }

}
