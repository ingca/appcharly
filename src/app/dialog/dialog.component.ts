import { Component, OnInit } from '@angular/core';
import { prompt, action, login, confirm, capitalizationType, inputType, LoginResult } from 'tns-core-modules/ui/dialogs';
import { from } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ReverseSlideOutTransition } from 'nativescript-ui-sidedrawer';


@Component({
  selector: 'ns-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  SimpleDialog()
  {
    alert("Hola");
  }

  Dialog(message: string)
    {
    const options = {
      title: "Race Selection",
      message: "You are a " + message,
      okButtonText: "Ok"
    };
    alert(options);
  }

  ActionDialog()
    {
      const options = {
        title: "Race Selection",
        message: "Choose your race",
        CancelButtonText: "Cancel",
        actions: ["Human","Elf","Dwarf","Orc","Unicorn"]
      };

      action(options).then((result:string)=>
      {
        this.ConfirmDialog(result);
      });
    }

  ConfirmDialog(race: string)
    {
      const options = {
        title: "Race Selection",
        message: "Are you sure you want to be " + race + "?",
        okButtonText: "Yes",
        cancelButtonText: "No"
      };
        confirm(options).then((result:boolean)=>
        {
          if(result)
          {
            this.Dialog(race);
          }
        });
    }

  LoginDialog()
    {
      const options = {
        title: "Accede a tu cuenta",
        message: "Ingresa tu usuario y contraseña",
        okButtonText: "Login",
        cancelButtonText: "Cancel",
        userNameHint: "Correo",
        passwordHint: "Contraseña"
      };

      login(options).then((result:LoginResult)=>
      {
        if(result.result)
        {
          this.authService.login(result.userName, result.password).then((response:string)=>
          {
              alert(response);
          }).catch((error) =>
          {
            alert(error);
          })
        }
      })
    }

  PromptDialog()
    {
      const options = {
        title: "Recuperacion de Contraseña",
        message: "Introduce tu correo para cambiar tu contraseña",
        okButtonText: "Ok",
        cancelButtonText: "Cancel",
        cancelable: true,
        inputType: inputType.email,
        capitalizationType: capitalizationType.none
      };

      prompt(options).then((result: PromptResult)=>
      {
        if(result.result)
        {
          this.authService.forgot(result.text).then((response: string) =>
          {
            alert(response);
          }).catch((error)=>
          {
            alert(error);
          });
        }
      });
    }

}
