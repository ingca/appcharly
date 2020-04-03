import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import * as platform from "tns-core-modules/platform";
declare var GMSServices: any;

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DialogComponent } from './dialog/dialog.component';

if (platform.isIOS) { 
    GMSServices.provideAPIKey("AIzaSyD0AXJg6YZxmReZ4PiZwBbzKILCX8sEBuc");
}
@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        AppComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
