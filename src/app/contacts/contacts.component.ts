import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ContactService } from '../../services/contact.service';
 
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
	
	  contacts = [];
	  alertMessage:string;
    alertMessageType:string;
    pageSize:number = 10;
    totalRecords:number = 0;
    isLoaded = false;
    user:any;

  	constructor(private _contactService: ContactService) { 
      
      var userObject = localStorage.getItem('user');
      this.user = JSON.parse(userObject);
      this.getUserContacts(1);

    }

  	ngOnInit() {}

    pageChanged(page: number) {

      this.getUserContacts(page);

    }

    getUserContacts(page: number){

      let start = (page - 1) * this.pageSize;

      this._contactService.getUserContacts(this.user._id, start, this.pageSize).subscribe(
          res => {
            if('data' in res){
              this.contacts = res.data;
              this.totalRecords = res.totalContacts;
            }
            
            this.isLoaded = true;
          },
          err => {
             console.error(err)
             this.isLoaded = true;
          }
      ); 
       
    } 

    delete(contact) : void  {

      if(confirm('Are you sure want to delete?')){
        
        this._contactService.deleteContact(contact._id).subscribe(
            data => {
              this.alertMessage = 'Contact successfully deleted';
              this.alertMessageType = 'success';
              this.getUserContacts(1);
            },
            err => console.error(err)
        ); 
      }

    }

    sendEmail(){

        this._contactService.sendEmail(1).subscribe(
            data => {
              this.alertMessage = 'Email sent successfully.';
              this.alertMessageType = 'success';
            },
            err => console.error(err)
        ); 

    }

}
