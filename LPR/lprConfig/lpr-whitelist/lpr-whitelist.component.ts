import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { LprCameraGroupService } from 'src/app/services/lpr-camera-group.service';
import { LprCameraService } from 'src/app/services/lpr-camera.service';
import { LprWhitelistService } from 'src/app/services/lpr-whitelist.service';
import { LprWhitelistFileUploaderComponent } from './lpr-whitelist-file-uploader/lpr-whitelist-file-uploader.component';
import { WebConstants } from 'src/app/util/web.constants';
import { TokenStorage } from 'src/app/util/token.storage';
import { ExcelExportDataService } from 'src/app/excelService/excel-export-data.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-lpr-whitelist',
  templateUrl: './lpr-whitelist.component.html',
  styleUrls: ['./lpr-whitelist.component.scss']
})
export class LprWhitelistComponent implements OnInit {

  public displayedColumns: string[] = [
    'numberPlate',
    'vehicleOwner',
    'jobTitle',
    'state',
    'country',
    'vin',
    'address',
    // 'whiteList',
    'actions'
  ];

  options = {
    fieldSeparator: ',',
    quoteStrings: '',
    decimalseparator: '.',
    showLabels: true,
    showTitle: false,
    useBom: true,
    headers: ['LicensePlate', 'VehicleOwner', 'Job', 'State', 'Country', 'Vin', 'Address']
  };

  public form: any;
  public dataSource = new MatTableDataSource();
  public lprCameraGroups: any[] = null;
  public updateMode: boolean = false;
  public updateId: number = null;
  public data: [] = [];
  sampleData: any;
  public tempId: any;
  public title: string = WebConstants.MENU_NAMES.REGISTERED_VEHICLE;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public lprCameraService: LprCameraService,
    public lprCamerGroupService: LprCameraGroupService,
    public lprWhiteListService: LprWhitelistService,
    public excelExportDataService: ExcelExportDataService,

    public toastrService: ToastrService,
    public dialog: MatDialog,
    public tokenStorage: TokenStorage,
    private titleService:Title) {

      this.titleService.setTitle(WebConstants.PROJECT_NAME + " | " + WebConstants.PAGE_TITLE.HIT_LIST_MANAGEMENT)
    this.getAllLprWhiteList();

    this.form = new FormGroup({
      numberPlate: new FormControl("", Validators.required),
      state: new FormControl(""),
      country: new FormControl(""),
      whiteList: new FormControl(false),
      vehicleOwner: new FormControl(""),
      jobTitle: new FormControl(""),
      vin: new FormControl(""),
      address: new FormControl(""),
    });
  }

  getTempId(obj: any){
    this.tempId = obj;
  }

  getAllLprWhiteList() {
    this.lprWhiteListService.getAllLprWhiteList()
      .pipe(first())
      .subscribe(response => {
        if(response.code == 9999){
          window.location.href = '#/access-denied';
        }
          else if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          //console.log("response ", response.data);
          this.data = response.data;
          this.dataSource = new MatTableDataSource<unknown>(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else {
          this.toastrService.error(response.value, "Failed To Load Data!");
        }
      });
  }

  addLprWhiteList() {
    let data = this.form.value;
    //console.log("addLprWhiteList :" + JSON.stringify(data));
    this.lprWhiteListService.addLprWhiteList(data)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value, "Data Added Successfully!");
          this.getAllLprWhiteList();
          this.form.reset();
        } else {
          this.toastrService.error(response.value, "Failed To Add Data!");
        }
      });
  }

  resetForm(){
    this.form.reset();
    this.updateMode = false;
  }

  fileUploaderDialog(): void {
    const dialogRef = this.dialog.open(LprWhitelistFileUploaderComponent, {
      width: '550px',
      data: null,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllLprWhiteList();
    });
  }

  sampleCSV() {
    this.sampleData = [
      {
        numberPlate: "JKL1243",
        vehicleOwner: "John",
        jobTitle: "Engineer",
        state: "GA",
        country: "US",
        vin: "JN3MS337A9PW202929",
        address: "GA; US",
      },
      {
        numberPlate: "PFL1353",
        vehicleOwner: "Wick",
        jobTitle: "Software Engr.",
        state: "GA",
        country: "US",
        vin: "JN3MS337A9PW202929",
        address: "GA; US",
      },
      {
        numberPlate: "KOL1443",
        vehicleOwner: "Cena",
        jobTitle: "Doctor",
        state: "FL",
        country: "US",
        vin: "JN3MS337A9PW202929",
        address: "GA; US",
      },
    ];

    new AngularCsv(this.sampleData, "SampleCSV", this.options);
  }

  ngOnInit(): void {}

  deleteLprWhitelist(obj: any) {
    this.lprWhiteListService.deleteLprWhiteList(obj.id)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value, "Data Deleted Successfully!");
          this.getAllLprWhiteList();

        } else {
          this.toastrService.error(response.value, "Failed To Delete Data!")
        }
      });
  }

  deleteAllRegisteredVehicle() {
    this.lprWhiteListService.deleteAllRegisteredVehicle()
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value, "All Records Deleted Successfully!");
          this.getAllLprWhiteList();
        } else {
          this.toastrService.error(response.value, "Failed To Delete Data!");
          this.getAllLprWhiteList();
        }
      });
  }

  setUpdateMode(obj: any) {
    this.updateMode = true;
    this.updateId = obj.id;
    this.form.controls["vehicleOwner"].setValue(obj.vehicleOwner);
    this.form.controls["jobTitle"].setValue(obj.jobTitle);
    this.form.controls["numberPlate"].setValue(obj.numberPlate);
    this.form.controls["state"].setValue(obj.state);
    this.form.controls["country"].setValue(obj.country);
    this.form.controls["vin"].setValue(obj.vin);
    this.form.controls["address"].setValue(obj.address);
    this.form.controls["whiteList"].setValue(false);
  }

  updateLprWhiteList() {
    let data = this.form.value;
    data.id = this.updateId;
    this.lprWhiteListService.updateLprWhiteList(data)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value, "Data Updated Successfully!");
          this.getAllLprWhiteList();
          this.form.reset();
          this.updateMode = false;
        } else {
          this.toastrService.error(response.value, "Failed To Update Data!")
        }
      });
  }

  excelSheetDownload() {
    let dataForExcel = [];

    this.data.forEach((row: any) => {
      let rowData: any = [row.numberPlate, row.vehicleOwner==null ? "":row.vehicleOwner, row.jobTitle==null ? "":row.jobTitle, row.state==null ? "":row.state, row.country==null ? "":row.country, row.vin==null ? "":row.vin, row.address==null ? "":row.address.includes(",") ? row.address.replaceAll(",",";") : row.address]
      dataForExcel.push(rowData);
    });

    let reportData = {
      title: this.title,
      data: dataForExcel,
      headers: ['LicensePlate' ,'VehicleOwner', 'Job', 'State', 'Country', 'VIN', 'Address']
    };

    // this.excelExportDataService.exportExcel(reportData)

    new AngularCsv(dataForExcel, this.title, this.options);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
