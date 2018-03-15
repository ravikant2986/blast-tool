import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { API_ENDPOINT } from '../config'

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class AuthService {

  public loginStatus = false; 
  
	constructor(private http: HttpClient) { }
  
  login(data) {

      let body = JSON.stringify(data);
      return this.http.post(API_ENDPOINT+'/auth/login',body, httpOptions);

  }

  register(data) {

    let body = JSON.stringify(data);
    return this.http.post(API_ENDPOINT+'/auth/register', body, httpOptions);

  }

  isAuthenticated(){

     return (localStorage.getItem('user')) ? true : false;
  }
 
  logOut(){

      localStorage.removeItem('user');
   
  }

  setLoginStatus(staus: boolean) {

      this.loginStatus = staus; 
  }

  getLoginStatus() {
      return this.loginStatus;
  }

  

}