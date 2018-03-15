import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
 
  id:String;
  contact:any = [];
  myform: FormGroup;
  alertMessage:string;
  alertMessageType:string;
  isLoaded = false;

  constructor(private router: Router, private route: ActivatedRoute, private _contactService: ContactService) { 
  		this.route.params.subscribe( params => {
  			this.id = params.id
  		});

  		this.getContact();

  }

  ngOnInit() {

  }


  getContact(){

  	this._contactService.getContact(this.id).subscribe(
        data => {
        	this.contact = data;
        	this.isLoaded = true;
        	this.createForm();
        },
        err => console.error(err)
    ); 

  }

  createForm(){
  	this.myform = new FormGroup({
         
        first_name: new FormControl(this.contact.first_name, [ 
            Validators.required
        ]),
        last_name: new FormControl(this.contact.last_name, [ 
            Validators.required
        ]),
        email: new FormControl(this.contact.email, [ 
            Validators.required,
            Validators.pattern("[^ @]*@[^ @]*") 
        ]),
        mobile: new FormControl(this.contact.mobile, [ 
            //Validators.required
        ])
    });

  }


  update(){

  	this._contactService.updateUserContact(this.id,this.myform.value).subscribe(
  		data => { 
  			this.alertMessage = 'Contacts Update successfully.';
  			this.alertMessageType = 'success';
  			setTimeout(()=> {
			      this.alertMessage = '';
			      this.alertMessageType = '';
			      //this.router.navigate(['/contacts']);
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
