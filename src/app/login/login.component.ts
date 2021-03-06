import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingIndicator, Mode, OptionsCommon } from '@nstudio/nativescript-loading-indicator';
import { RouterExtensions } from "nativescript-angular/router";


@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{

  email = "";
  password = "";
  loading = false;
  indicator = new LoadingIndicator();

  constructor(private authService: AuthService, private router: RouterExtensions)
  { 

  }

  ngOnInit() {
  }

  login()
  {
    console.log(this.email);
    console.log(this.password);
    this.showLoader();
    this.authService.login(this.email, this.password).then((token:string)=>
    {
      this.hideLoader();
      console.log(token);

      this.router.navigate(["/home"],{ clearHistory:true});
    }).catch((error)=>
    {
      alert(error);
      this.hideLoader();
      //console.log(error);
    })
  }

  goto_register()
  {
    this.router.navigate(["/register"],{ clearHistory:true});
  }

  showLoader()
  {
    this.loading = true;
    const options: OptionsCommon = {
      message: 'Cargando...',
      details: 'espera un momento',
      margin: 10,
      dimBackground: true,
      color: '#f4f4f4', 
      backgroundColor: 'gray',
      userInteractionEnabled: false, 
      hideBezel: true, 
      mode: Mode.Indeterminate,
      android: {
        cancelable: false,
          
      },
      ios: {
        square: false
      }
    };
    this.indicator.show(options);
  }
    

  hideLoader()
  {
    this.loading = false;
    this.indicator.hide();
  }

}
