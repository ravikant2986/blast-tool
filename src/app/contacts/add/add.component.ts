import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';
 

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {

  myform: FormGroup;
  alertMessage:string;
  alertMessageType:string;
  user:any;

  constructor(private _contactService: ContactService) { 
      var userObject = localStorage.getItem('user');
      this.user = JSON.parse(userObject);
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
        mobile: new FormControl('', [ 
            //Validators.required
        ])
         
    });
    

  }

  create(){

  	this._contactService.addUserContacts(this.user._id,this.myform.value).subscribe(
  		data => { 
  			this.alertMessage = 'Contacts Added successfully.';
  			this.alertMessageType = 'success';
  			 this.myform.reset();

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
