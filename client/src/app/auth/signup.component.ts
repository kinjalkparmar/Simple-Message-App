import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl,Validators, FormBuilder } from "@angular/forms";
import {AuthService} from './auth.service'
import { User } from "./user.model";


@Component({
    selector: 'app-signup',
  //  template: `Hi`
    templateUrl: './signup.component.html',
    styles:[`
    input.ng-invalid.ng-touched{
        border: 1px solid red;
     }    
        `]
})
export class SignupComponent implements OnInit{
    myForm: FormGroup

    constructor(private fb: FormBuilder, private authservice: AuthService){}
    
    ngOnInit(){
        this.myForm = this.fb.group({
            firstName:['',Validators.required],
            lastName:['',Validators.required],
            email:['',[Validators.required, Validators.email]],
            password: ['',Validators.required]
        });
}

    onSubmit(){
       const user = new User(
           this.myForm.value.email,
           this.myForm.value.password,
           this.myForm.value.firstName,
           this.myForm.value.lastName
       );
        this.authservice.signup(user)
            .subscribe(
                data=> console.log(data),
                error=> console.log(error)
            )
        setTimeout(()=>{
            this.myForm.reset();
        },2000);

}}