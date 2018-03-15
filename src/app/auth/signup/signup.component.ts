import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myform: FormGroup;
  alertMessage:string;
  alertMessageType:string;

  constructor(private auth : AuthService, private router: Router) { 

      var userObject = localStorage.getItem('user');
      var user = JSON.parse(userObject);
      if(user){
        this.auth.setLoginStatus(true);
        this.router.navigate(['/contacts']);
      }

  }

  ngOnInit() {

  	this.myform = new FormGroup({
         
        first_name: new FormControl('', [ 
            Validators.required
        ]),
        last_name: new FormControl('', [ 
            Validators.required
        ]),
        email: new FormControl('', [ 
            Validators.required,
            Validators.pattern("[^ @]*@[^ @]*") 
        ]),
        password: new FormControl('', [ 
            Validators.required
        ])
         
    });


  }


  register(){

  		this.auth.register(this.myform.value).subscribe(
  		data => { 
  			this.alertMessage = 'Account created successfully.';
  			this.alertMessageType = 'success';
  			this.myform.reset();
  			setTimeout(()=> {
			    this.router.navigate(['/auth/login']);
			},2000);

  		},
  		err => {
  			if('error' in err &&  err.error.message){
  				this.alertMessage = err.error.message;
  				this.alertMessageType = 'danger';
  			}
  			console.error('error', err)
  		} 
	  ); 

  }


}
