import { Component, OnInit } from '@angular/core';
import { Page } from "tns-core-modules/ui";
import { LoadingIndicator, Mode, OptionsCommon } from '@nstudio/nativescript-loading-indicator';
import { CFAlertDialog,DialogOptions,CFAlertGravity,CFAlertActionAlignment,CFAlertActionStyle,CFAlertStyle } from 'nativescript-cfalert-dialog';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'ns-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  first_name= "";
  last_name= "";
  email= "";
  password= "";
  password_confirmation= "";
  loading = false;

  indicator = new LoadingIndicator();

  niceAlert = new CFAlertDialog();

  constructor(private page: Page, private authService: AuthService) { }

  ngOnInit() {
    this.page.actionBarHidden = true;

  }

  register(){
    this.showLoader();
    this.authService.Register(this.first_name, this.last_name, this.email, this.password, this.password_confirmation).then((response)=>
    {
      this.hideLoader();
      alert(response);
      /*
      const options: DialogOptions = {
        dialogStyle: CFAlertStyle.ALERT,
        title: "Registro",
        message: response,
        buttons: [{
          text: "continuar",
          buttonStyle: CFAlertActionStyle.POSITIVE,
          buttonAlignment: CFAlertActionAlignment.END,
          onClick: () =>
          {

          }
        }]
      };
      this.niceAlert.show(options).then(()=>{

      });
      */
    }).catch((error) =>
    {
      this.hideLoader();
      alert(error);
      /*
      const options: DialogOptions = {
        dialogStyle: CFAlertStyle.ALERT,
        title: "Error",
        message: error,
        buttons: [{
          text: "continuar",
          buttonStyle: CFAlertActionStyle.NEGATIVE,
          buttonAlignment: CFAlertActionAlignment.END,
          onClick: () =>
          {

          }
        }]
      };
      this.niceAlert.show(options).then(()=>{

      });
      */
    });
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
