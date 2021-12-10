import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
//import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModal,
    // HttpClient
    DataTableModule,
    
  ]
})
export class PhoneBookModule { }
