import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../../services/auth-guard.service';
import { ContactsComponent } from './contacts.component';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { ImportComponent } from './import/import.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', component: ContactsComponent, canActivate : [AuthGuardService] },
  { path: 'import', component: ImportComponent , canActivate : [AuthGuardService] },
  { path: 'add', component: AddComponent , canActivate : [AuthGuardService] },
  { path: 'edit/:id', component: EditComponent , canActivate : [AuthGuardService] }
];


@NgModule({
  imports: [
  	CommonModule, 
  	RouterModule.forChild(routes),
  	FormsModule, 
    ReactiveFormsModule,
  ],
  declarations: [
  	ContactsComponent,
    ImportComponent,
    AddComponent,
    EditComponent,
    PaginationComponent
  ],
  exports: [ RouterModule]
   
})

export class ContactsModule { }
