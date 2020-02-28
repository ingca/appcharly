import { Injectable } from '@angular/core';
import { User } from '../clasess/user';
import { request } from "tns-core-modules/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{

user = new User();
bizURL = "http://192.168.0.20:8000/api/";
loginURL = "auth/login";

  constructor() 
  { 

  }

  login(email:string, password:string): Promise<string>
  {
    return new Promise<string>((resolve, reject) =>
    {
      request({
        url: this.bizURL + this.loginURL,
        headers: {"Content-Type": "application/json"},
        method: "POST",
        content: JSON.stringify({
          email,
          password
        })
      }).then((response)=>
      {
        const result = response.content.toJSON();
        resolve();
      }).catch((error)=>
      {
        //console.log(error);
        reject();
      })
    });
  }
}
