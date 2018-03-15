import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {Router} from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
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
         
        email: new FormControl('', [ 
            Validators.required,
            Validators.pattern("[^ @]*@[^ @]*") 
        ]),
        password: new FormControl('', [ 
            Validators.required
        ])
         
    });

  }


  login(){

      this.auth.login(this.myform.value).subscribe(
        data => { 
          localStorage.setItem('user', JSON.stringify(data));
          this.auth.setLoginStatus(true);
          this.router.navigate(['/contacts']);

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
