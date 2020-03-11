import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'ns-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private authService: AuthService) { 

  }

  ngOnInit() {
  
  }

onDrawerButtonTap(): void{
  const sideDrawer = <RadSideDrawer>app.getRootView();
  sideDrawer.showDrawer();
}



}
