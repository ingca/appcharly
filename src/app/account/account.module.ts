import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptFormsModule } from "nativescript-angular";
import { AccountComponent } from "./account.component";
import { AccountRoutingModule } from "./account-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AccountRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AccountComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AccountModule { }
