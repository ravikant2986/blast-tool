import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as XLSX from 'xlsx';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  fileData;
  alertMessage:string;
  alertMessageType:string;
  user:any;
  
  constructor(private _contactService: ContactService, private router: Router) {

    var userObject = localStorage.getItem('user');
    this.user = JSON.parse(userObject);

  }


  ngOnInit() { }

  	userFile(event) {
  		 
  		var file = event.target.files[0]; 
  		let fileReader = new FileReader();
  		
  		fileReader.onload = (e) => {
            var data = new Uint8Array(fileReader.result);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type:"binary"});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            this.fileData = XLSX.utils.sheet_to_json(worksheet,{raw:true});

        }
        fileReader.readAsArrayBuffer(file);

  	}

  	upload() {
 		
 		if(!this.fileData){
  			alert('Please select file.');
  			return false;
  		}
 		 
  		this._contactService.importUserContacts(this.user._id,this.fileData).subscribe(
      		data => { 
      			this.alertMessage = 'Contacts imported successfully.';
      			this.alertMessageType = 'success';
      			//this.router.navigate(['/contacts']);

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
