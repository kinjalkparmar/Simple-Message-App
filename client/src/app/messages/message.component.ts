import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./message.service";


@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styles:[`.author{
        display: inline-block;
        font-style: italic;
        font-size: 12px;
        width: 80%;
    }
    
    .config{
        display: inline-block;
        text-align: right;
        font-size: 12px;
        width: 19%;
    }`]
})
export class MessageComponent{

   @Input() message: Message;


   constructor(private messageservice: MessageService){

   }

   onEdit(){
    this.messageservice.editMessage(this.message);
    console.log(this.message)
   }
   onDelete(){
       this.messageservice.deleteMessage(this.message)
       .subscribe(res=> console.log(res))
       ;
   }

   belongsToUser(){
       return localStorage.getItem('userId')==this.message.userId;
   }
}