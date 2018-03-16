import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
 


import { API_ENDPOINT } from '../config'

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class ContactService {

	constructor(private http: HttpClient) { }
    
  getUserContacts(userId, start:number, limit:number ) {
      
      return this.http.get(API_ENDPOINT+'/contacts/'+userId+'/'+start+'/'+limit, httpOptions)
        .pipe(
            map(contacts => {
                return contacts;
            }),
            catchError(this.handleError)
        );
  }

  addUserContacts(userId,data) {

      let body = JSON.stringify(data);
      return this.http.post(API_ENDPOINT+'/contacts/add/'+userId, body, httpOptions);

  }
  
  updateUserContact(id,data){
  	  let body = JSON.stringify(data);
      return this.http.post(API_ENDPOINT+'/contact/update/'+id, body, httpOptions);
  }

  getContact(id) {

      return this.http.get(API_ENDPOINT+'/contact/'+id, httpOptions);
      
  }

  deleteContact(id) {

      let body = JSON.stringify({id : id});
      return this.http.post(API_ENDPOINT+'/contacts/delete', body, httpOptions);
      
  }

  importUserContacts(userId,data) {

      let body = JSON.stringify(data);
      return this.http.post(API_ENDPOINT+'/contacts/import/'+userId, body, httpOptions);

  }


  sendEmail(userId) {
  	  var data = [];
      let body = JSON.stringify(data);
      return this.http.post(API_ENDPOINT+'/contacts/send-email/'+userId, body, httpOptions);

  }


   private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'Node.js server error');
  }




}