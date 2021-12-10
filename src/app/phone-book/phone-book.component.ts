import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { InsertPhoneBook, PhoneBook } from './phone-book.class';
import { PhoneBookService } from './phone-book.service';
import swal from "sweetalert2";
import Swal from 'sweetalert2';
import { animate, style, transition, trigger } from "@angular/animations";
@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.css'],
  animations: [
    trigger("fadeInOutTranslate", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
      transition(":leave", [
        style({ transform: "translate(0)" }),
        animate(300, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class PhoneBookComponent implements OnInit {

  active = 1;
  public  modalHeader:string='';
  public modalSize:string='';
  public model: NgbDateStruct={day:0,month:0,year:0};
  contact:PhoneBook[]=[];
  createContact:InsertPhoneBook={
    contactName: "",
    contactEmail:"",
    contactNumber:"",
  }
  buttonType:any;
  constructor(
    private phoneBookService: PhoneBookService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    ) { }

  ngOnInit(): void {
    this.getAllPhoneNumber();
  }

  getAllPhoneNumber(){
    this.phoneBookService.findAll().subscribe(data=>{
      this.contact=data;
    })
  }
  createNewPhoneNumber(CreateNewPhoneNumberModal: any) : void {
    console.log("createNewPhoneNumber:: method called");
    this.modalHeader="Create New Contact";
    this.buttonType="Save";
    this.modalSize='m';
    this.modalService.open(CreateNewPhoneNumberModal,{size:'lg',scrollable:true, centered: true});
  }
  saveContact() : void {
    this.modalService.dismissAll();
    this.ShowSpinner();
    console.log("saveContact called");
    this.phoneBookService.saveContact(this.createContact).subscribe((data:any)=>{
      if(data.result=="SUCCESS"){
        this.HideSpinner();
        if(this.buttonType=="Save"){
          Swal.fire(
            'Contact Inserted Successfully',
            'You clicked the button!',
            'success'
          )
        }
        else if(this.buttonType=="Update"){
          Swal.fire(
            'Contact Updated Successfully',
            'You clicked the button!',
            'success'
          )
        }
        //quick add the data to the array
        this.contact.push({
          "contactId": this.contact.length+1,
        "contactName": this.createContact.contactName,
        "contactEmail": this.createContact.contactEmail,
        "contactNumber": this.createContact.contactNumber,
        "isActive": true,
        "createdDate": new Date().toLocaleDateString("en-US"),
        "updatedDate": new Date().toLocaleDateString("en-US")
        });
        this.getAllPhoneNumber();
        this.cleanFormData();
        
      }
      this.cleanFormData();
    })
  }
  updateContact(CreateNewPhoneNumberModal:any,contactId : number){
    this.cleanFormData();
    console.log("updateContact:: method called");
    this.fetchDataToUpdateContact(contactId);
    this.modalHeader="Update Contact";
    this.buttonType="Update";
    this.modalSize='m';
    this.modalService.open(CreateNewPhoneNumberModal,{size:'lg',scrollable:true, centered: true}); 
  }
  fetchDataToUpdateContact(contactId:number):void {
    this.phoneBookService.fetchContactToUpdate(contactId).subscribe((data)=>{
      this.createContact.contactName=data.contactName;
      this.createContact.contactEmail=data.contactEmail;
      this.createContact.contactNumber=data.contactNumber;
      console.log("server is sending data >>>>",data);
    })
  }

  deleteContact(contactId:number):void {
    this.ShowSpinner();
    this.phoneBookService.deleteContact(contactId).subscribe((data:any)=>{
     
      this.HideSpinner();
      this.contact=data;
      Swal.fire(
        'Contact Deleted Successfully',
        'You clicked the button!',
        'success'
      )
    
    })
  }
  ShowSpinner() {
    console.log("Show Spinner called...");
    this.spinner.show();
    setTimeout(() => {
      this.HideSpinner();
    }, 15000);
  }
  HideSpinner() {
    console.log("Hide Spinner called...");
    this.spinner.hide();
  }
  cleanFormData(){
    // clean the modal popup
    this.createContact={
      contactName:"",
      contactEmail:"",
      contactNumber:""
    };
  }

}
