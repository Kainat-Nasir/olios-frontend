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
import { VidarWhitelistService } from 'src/app/services/vidar-whitelist.service';
import { LprCameraService } from 'src/app/services/lpr-camera.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vidar-whitelist-file-uploader',
  templateUrl: './vidar-whitelist-file-uploader.component.html',
  styleUrls: ['./vidar-whitelist-file-uploader.component.scss']
})
export class VidarWhitelistFileUploaderComponent implements OnInit {

  public fileData: File = null;
  public camerasData: any;
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
    public dialogRef: MatDialogRef<VidarWhitelistFileUploaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    public toastrService: ToastrService,
    private tokenStorage: TokenStorage,
    public handler: HttpBackend,
    private vidarWhitelistService: VidarWhitelistService,
    public lookupService: LookupService,
    public lprCameraService: LprCameraService) {
  }

  ngOnInit() {
    this.getAllCameras();

    this.form = new FormGroup({
      cameraIp: new FormControl("", Validators.required),
    });  
  }

  getAllCameras(): void {
    this.lprCameraService.getAllLprCamera()
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.camerasData = response.data;
        } else {
          console.log("Zone API Error!");
        }
      });
  }

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

        if (error?.status === 0) {
          this.toastrService.error("Please verify file's data format and size", error?.name);
        } else {
          this.toastrService.error("Error Uploading File", error?.name);
        }
        this.closeDialog();
      })
  }

  public readFile(){
    let formData = this.form.value;;
    let cameraIp = formData.cameraIp;

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
                  // && colArr[1] === 'RuleId'
                  // && colArr[2] === 'CameraIp'
                  )){
                    this.toastrService.error("Please follow Sample CSV ","Invalid Excel Header")
                    break;
                }
                if(colArr && colArr.length >= 1 
                  && colArr[0] !== 'LicensePlate'
                  // && colArr[1] !== 'RuleId'
                  // && colArr[2] !== 'CameraIp'
                  ){
                    let numberPlate = colArr[0];
                    let ruleId = colArr[1];
                    let cameraIp = colArr[2];
                    
                    if(numberPlate.trim() != ''){
                      if(numberPlate.length >= 3 && numberPlate.length <= 8){
                          payloadArr.push({"numberPlate": numberPlate, "ruleId": ruleId, "cameraIp": cameraIp});
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
            this.bulkUpload(cameraIp, payloadArr);
          }
          else{
            this.toastrService.error("No License Plate Found");
          }
        }
        
      }
  }

  bulkUpload(cameraIp, payloadArr):Observable<any>{

    let numberPlatesString = "";
    for(let i=0; i<payloadArr.length; i++){
      numberPlatesString += "("+payloadArr[i].ruleId+",%27"+payloadArr[i].numberPlate+"%27)"

      if(!(i == payloadArr.length-1)){
        numberPlatesString += ",";
      }
    }    

    let url = cameraIp+"/login.html?p_send=1&p_username=conure&p_passw=Elephant2t2r";
    let url2 = cameraIp+"/lpr/cff?sql=INSERT%20INTO%20vehicles%20VALUES"+numberPlatesString+";&cmd=querydb";

    fetch(url).then((res)=>
      fetch(url2).then((res2)=>{
        console.log(res2);
        this.closeDialog();
      }
      )
    );

    return;

  }

  chooseFile() {
    let myInput = document.getElementById("myInput");
    myInput.click();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
