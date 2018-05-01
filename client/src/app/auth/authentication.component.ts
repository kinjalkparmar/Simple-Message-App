import { Component } from "@angular/core";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-authentication',
    template:  `
    <header class="row spacing">
    <nav class="col-md-8 col-md-offset-2">
        <ul class="nav nav-tabs">
            <li routerLinkActive="active"><a [routerLink]="['signup']">SignUp</a></li>
            <li routerLinkActive="active" *ngIf="!isLoggedIn()"><a [routerLink]="['signin']">SignIn</a></li>
            <li routerLinkActive="active" *ngIf="isLoggedIn()"><a [routerLink]="['logout']">Logout</a></li>
        </ul>
    </nav>
    </header>   
    <div class="row">
        <router-outlet></router-outlet>
    </div>          
        `
})
export class AuthenticationComponent{

    constructor(private authservice: AuthService){}

    isLoggedIn(){
        return this.authservice.isLoggedIn();
    }
}