import { Component } from "@angular/core";
import { FormGroup, FormControl,Validators,FormBuilder } from "@angular/forms";
import { OnInit } from "@angular/core";
import { User } from "./user.model";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";


@Component({
    selector: 'app-signin',
 //   template:'Hi'
    templateUrl: './signin.component.html',
    styles:[`
    input.ng-invalid.ng-touched{
        border: 1px solid red;
     }    
        `]
})
export class SigninComponent implements OnInit{
    myForm: FormGroup

    constructor(private fb: FormBuilder,private authservice: AuthService,private router: Router){}
    ngOnInit(){
        this.myForm = this.fb.group({
            email:['',[Validators.required, Validators.email]],
            password: ['',Validators.required]
        });
}

    onSubmit(){
        const user = new User(this.myForm.value.email,this.myForm.value.password);
        this.authservice.signin(user)
            .subscribe(
                data=>{
                    localStorage.setItem('token', data.token )
                    localStorage.setItem('userId', data.userid )
                    this.router.navigateByUrl('/');

                },
                err=> {console.log(err)}
            )
        setTimeout(()=>{
            this.myForm.reset();
        },2000);

}

}