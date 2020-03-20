import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { BarcodeScanner } from "nativescript-barcodescanner";
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums";
import * as camera from "nativescript-camera";
import { isAndroid, isIOS } from "tns-core-modules/platform";



@Component({
    selector: "Home",
    templateUrl: "./home.component.html"

})
export class HomeComponent implements OnInit {

    scanner = new BarcodeScanner();

    imgSrc = "";

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    getLocation()
    {
        geolocation.enableLocationRequest(true).then(()=>
        {
            const options = {desiredAccuracy: Accuracy.high, maximumAge:5000, timeout:20000};
            geolocation.getCurrentLocation(options).then((response)=>
            {
                console.log(response);
            }).catch((error)=>
            {
                console.log(error);
            });
        }).catch((error)=>
        {
            console.log(error);
        });
    }


    takePicture()
    {
        camera.requestPermissions().then(()=>
        {
            const options: camera.CameraOptions = { width: 100, height:100, cameraFacing:"rear", keepAspectRatio:true, saveToGallery:true};
            camera.takePicture(options).then((image)=>
            {
                console.log(image);
                if(isAndroid)
                {
                    this.imgSrc = image.android;
                }
                else if (isIOS)
                {
                    this.imgSrc = image.ios;
                }
            }).catch((error)=>
            {
                console.log(error);
            });
        }).catch((error)=>
        {
            console.log(error);
        });
    }

    Scan()
    {
        this.scanner.available().then(()=>
        {
            this.scanner.hasCameraPermission().then((result)=>
            {
                if (result)
                {
                    this.scanner.scan({
                        formats:"QR_CODE",
                        cancelLabel:"Cancelad",
                        message:"Escaneo un QR",
                        preferFrontCamera: false,
                        showFlipCameraButton: true,
                        showTorchButton: true,
                        torchOn: false,

                    }).then((scanResult)=>
                    {
                            console.log(scanResult);

                    }).catch((error)=>
                    {
                        console.log(error);
                    });
                }
                else
                {
                    this.scanner.requestCameraPermission().then(() =>
                    {
                        this.scanner.scan({
                            formats:"QR_CODE",
                            cancelLabel:"Cancelad",
                            message:"Escaneo un QR",
                            preferFrontCamera: false,
                            showFlipCameraButton: true,
                            showTorchButton: true,
                            torchOn: false,
    
                        }).then((scanResult)=>
                        {
                                console.log(scanResult);
    
                        }).catch((error)=>
                        {
                            console.log(error);
                        });
                    }).catch((error) =>
                    {
                        console.log(error);
                    });
                }
            }).catch((error) =>
            {
                console.log(error);
            });
        }).catch((error) =>
        {
            console.log(error);
        });
}
}
