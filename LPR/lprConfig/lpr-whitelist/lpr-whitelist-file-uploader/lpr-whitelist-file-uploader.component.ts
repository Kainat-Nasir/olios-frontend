import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { WebConstants } from 'src/app/util/web.constants';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpBackend, HttpEvent, HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TokenStorage } from 'src/app/util/token.storage';
import { Lookup } from 'src/app/model/lookup';
import { LookupService } from 'src/app/services/lookup.service';
import { LprWhitelistService } from 'src/app/services/lpr-whitelist.service';

@Component({
  selector: 'app-lpr-whitelist-file-uploader',
  templateUrl: './lpr-whitelist-file-uploader.component.html',
  styleUrls: ['./lpr-whitelist-file-uploader.component.scss']
})
export class LprWhitelistFileUploaderComponent implements OnInit {

  public fileData: File = null;
  public uploadedurl = environment.BaseServiceUrl + WebConstants.API_URL.LPR_WHITELIST.FILE_UPLOADER_LPR_WHITELIST;
  public whiteList: Lookup[] = [];
  public form: any;
  public fileName: string = "No file Chosen";
  public fileSize: any = "";
  public allowedFileTypes: any = ["application/vnd.ms-excel"];

  public progress: number = -1;
  public whitelistData: Lookup[] = [];

  public errorCount: any = 0;
  public passCount: any = 0;

  constructor( 
    public dialogRef: MatDialogRef<LprWhitelistFileUploaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    public toastrService: ToastrService,
    private tokenStorage: TokenStorage,
    public handler: HttpBackend,
    private lprWhitelistService: LprWhitelistService,
    public lookupService: LookupService) {
    this.http = new HttpClient(handler);
  }

  ngOnInit() {
    this.init();

    this.form = new FormGroup({
      whiteList: new FormControl(true),
    });
  }

  init(): void {
    //this.getWhitelist();
  }

  // getWhitelist() {
  //   this.lookupService.getWhitelistFileData()
  //     .pipe(first())
  //     .subscribe(response => {
  //       if (response.code === WebConstants.STATUS.CODE_SUCCESS) {
  //         if (response.data && response.data.length > WebConstants.INT_ZERO) {
  //           this.whitelistData = response.data;
  //         }
  //       }
  //     });
  //   }

  fileProgress(fileInput: any) {
    let fileData = <File>fileInput.target.files[0];
    if (fileData.type == "text/csv") {
      this.fileData = fileData;
      this.fileName = fileData.name;
      this.fileSize = fileData.size;
      this.toastrService.info("File : " + this.fileName + " ; Size: " + this.fileSize, "File Selected");
    } else {
      this.fileData = null;
      this.fileName = "No file chosen";
      this.fileSize = "";
      this.toastrService.warning("Please select correct file", "Wrong File Type Error");
    }
  }

  onSubmit() {
    this.progress = 0;
    const formData = new FormData();
    formData.append('file', this.fileData);

    // if (this.form.getRawValue().fileUploaded !== "") {
    //   formData.append('file', this.fileData);
    //   // formData.append('geofenceId', this.form.getRawValue().geofenceId);
    // //   // formData.append('parkingZoneId', this.form.getRawValue().parkingZoneId);
    // } else {
    //   formData.append('file', '0');
    // //   formData.append('geofenceId', '0');
    // //   formData.append('parkingZoneId', '0');
    // }
    // if (this.checked == false) {
    //   formData.append('isWhitelist', '0');//is blacklist
    // } else {
    //   formData.append('isWhitelist', '1');//is whitelist
    // }

    let headers = { 'Authorization': `Bearer ${this.tokenStorage.getToken()}` };
    this.http.post(this.uploadedurl, formData, { 'responseType': 'text',
                   headers: headers, reportProgress: true, observe: 'events' })
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            //console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            //console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            break;
          case HttpEventType.Response:
            this.toastrService.success("success", "File Uploaded Successfully");

            setTimeout(() => {
              this.progress = -1;
              this.closeDialog();
            }, 1000);
        }
      }, (error: any) => {
        //console.log("error in upload ", error);

        if (error?.status === 0) {
          this.toastrService.error("Please verify file's data format and size", error?.name);
        } else {
          this.toastrService.error("Error Uploading File", error?.name);
        }
        this.closeDialog();
      })
  }

  public readFile(){
    let data = this.form.value;
    let whiteList = data.whiteList
    if(whiteList == null){
      whiteList = true;
    }
    //console.log(this.fileData);
    if(this.fileData) {
        //console.log(this.fileData.name);
        //console.log(this.fileData.size);
        //console.log(this.fileData.type);
        let reader: FileReader = new FileReader();
        reader.readAsText(this.fileData);
        
        reader.onload = (e) => {
          let payloadArr = [];
          let csv: string = reader.result as string;
          let rowArr = csv.split('\r\n');
          if(rowArr){
            for(let i=0;i<rowArr.length;i++){
              if(rowArr[i] && rowArr[i] != ""){
                let colArr = rowArr[i].split(',');
                //console.log("col Arr ",colArr);
                if(i === 0 && !(colArr && colArr.length >= 1 
                  && colArr[0] === 'LicensePlate'
                  // && colArr[1] === 'State'
                  // && colArr[2] === 'Country'
                  // && colArr[3] === 'VehicleOwner'
                  )){
                    this.toastrService.error("Please follow Sample CSV ","Invalid Excel Header")
                    break;
                }
                if(colArr && colArr.length >= 1 
                  && colArr[0] !== 'LicensePlate'
                  // && colArr[1] !== 'State'
                  // && colArr[2] !== 'Country'
                  // && colArr[3] !== 'VehicleOwner'
                  ){
                    let numberPlate = colArr[0];
                    let vehicleOwner = colArr[1];
                    let jobTitle = colArr[2];
                    let state = colArr[3];
                    let country = colArr[4];
                    let vin = colArr[5];
                    let address = '';
                    if(colArr.length>7){
                      for(let y=6; y<colArr.length;y++){
                        address += colArr[y] + ',';
                      }
                      address = address.replace(/(",)\n/g,'');
                    }
                    else{
                      address = colArr[6];
                    }
                    
                    address = address.replace(/[;]/g,",");
                    let addressString=address.replace(/["]/g,'');
                    if(numberPlate.trim() != ''){
                      if(numberPlate.length >= 3 && numberPlate.length <= 8){
                          payloadArr.push({"numberPlate": numberPlate,"state": state,"country": country,"whiteList": whiteList, "vehicleOwner": vehicleOwner, "jobTitle": jobTitle, "vin": vin, "address": addressString});
                          this.passCount += 1;
                        }
                      else{
                        this.toastrService.error('"' + numberPlate + '" is an Invalid Number Plate');
                      }
                    }
                    else{
                      this.errorCount += 1;
                    }
                }
              }
            }
          }
          //console.log(csv);
          //console.log("payloadARR ",payloadArr);
          if(payloadArr && payloadArr.length > 0){
            this.bulkUpload(payloadArr);
          }
        }

        
      }
  }

  bulkUpload(payloadArr){
    this.lprWhitelistService.addMultipleLprWhiteList(payloadArr)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value, "Licence Plate Added Successfully!");
          if(this.errorCount > 0){
            this.toastrService.info(this.passCount + ' Licence Plate Added, </br>' + this.errorCount + ' Failed','Result',{ enableHtml:true });
          }
          else{
            this.toastrService.info(this.passCount + ' Licence Plate Added','Result',{ enableHtml:true });
          }
          this.closeDialog();
        } else {
          this.toastrService.error(response.value, "Failed To Add Licence Plate!")
          this.closeDialog();
        }
      });
  }

  chooseFile() {
    let myInput = document.getElementById("myInput");
    myInput.click();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
