import { Injectable } from "@angular/core";
import {User} from './user.model'
import { Http, Headers } from "@angular/http";
import 'rxjs/Rx'
import { Response } from "@angular/http";
import { Observable } from "rxjs";
import { ErrorService } from "../error/error.service";
@Injectable()

export class AuthService{
    constructor(private http: Http,private errorService: ErrorService){

    }
    signup(user: User){
        const body = JSON.stringify(user);
        const header =new Headers({'content-type': 'application/json'});
        return this.http.post('http://localhost:3000/user', body, {headers: header})
            .map((response: Response)=> response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
               return Observable.throw(error.json())
            });

    }

    signin(user: User){
        const body = JSON.stringify(user);
        const header =new Headers({'content-type': 'application/json'});
        return this.http.post('http://localhost:3000/user/signin', body, {headers: header})
            .map((response: Response)=> response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
               return Observable.throw(error.json())
            });

    }

    logout(){
        localStorage.clear();
    }
    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }
}