import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { LprCameraGroupService } from 'src/app/services/lpr-camera-group.service';
import { LprCameraService } from 'src/app/services/lpr-camera.service';
import { WebConstants } from 'src/app/util/web.constants';
import { ExcelExportDataService } from 'src/app/excelService/excel-export-data.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lpr-camera-list',
  templateUrl: './lpr-camera-list.component.html',
  styleUrls: ['./lpr-camera-list.component.scss']
})
export class LprCameraListComponent implements OnInit {
  public form: any;
  public displayedColumns: string[] = [
    'cameraName',
    'cameraCode',
    'str_camera_stream_path',
    'cameraDescription',
    'cameraGroupName',
    'actions'
  ];
  public dataSource = new MatTableDataSource();
  public lprCameraGroups: any[] = null;
  public updateMode: boolean = false;
  public updateId: number = null;
  public tempId: any;
  public title: string = WebConstants.MENU_NAMES.CAMERA_LIST;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public lprCameraService: LprCameraService,
    public lprCamerGroupService: LprCameraGroupService,
    public toastrService: ToastrService, public excelExportDataService: ExcelExportDataService,
    private titleService:Title) {
      this.titleService.setTitle(WebConstants.PROJECT_NAME + " | " + WebConstants.PAGE_TITLE.CAMERA_MANAGEMENT)
      this.getAllLprCamera();
      this.getAllLprCameraGroups();
      this.form = new FormGroup({
        cameraName: new FormControl("", Validators.required),
        cameraCode: new FormControl("", Validators.required),
        str_camera_stream_path: new FormControl("", Validators.required),
        cameraDescription: new FormControl("", Validators.required),
        cameraGroupId: new FormControl("", Validators.required)
      });
  }

  getAllLprCamera() {
    this.lprCameraService.getAllLprCamera()
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          //console.log("response ", response.data);
          let data = response.data;
          this.dataSource = new MatTableDataSource<unknown>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.toastrService.error(response.value, "Failed To Load Data!")
        }
      });
  }

  getTempId(obj: any){
    this.tempId = obj;
  }

  getAllLprCameraGroups() {
    this.lprCamerGroupService.getAllLprCameraGroup()
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          //console.log("response ", response.data);
          this.lprCameraGroups = response.data;
        } else {
          this.toastrService.error(response.value, "Failed To Load Data!")
        }
      });
  }

  ngOnInit(): void {}

  deleteLprCamera(obj: any) {
    let id = parseInt(obj.id);
    this.lprCameraService.deleteLprCamera(id)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value, "Data Deleted Successfully!");
          this.getAllLprCamera();

        } else {
          this.toastrService.error(response.value, "Failed To Delete Data!")
        }
      });
  }

  setUpdateMode(obj: any) {
    let cameraGroup = null;
    for (let x = 0; x < this.lprCameraGroups.length; x++) {
      if (this.lprCameraGroups[x].groupName === obj.cameraGroupName) {
        cameraGroup = this.lprCameraGroups[x];
      }
    }

    this.updateMode = true;
    this.updateId = obj.id;
    this.form.controls["cameraName"].setValue(obj.cameraName);
    this.form.controls["cameraCode"].setValue(obj.cameraCode);
    this.form.controls["cameraDescription"].setValue(obj.cameraDescription);
    this.form.controls["str_camera_stream_path"].setValue(obj.cameraStreamPath);
    this.form.controls["cameraGroupId"].setValue(cameraGroup.id, { onlyself: true });
  }

  updateLprCamera() {
    let data = this.form.value;
    data.id = this.updateId;
    this.lprCameraService.updateLprCamera(data)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value, "Data Updated Successfully!");
          this.getAllLprCamera();
          this.form.reset();
          this.form.controls["cameraGroupId"].setValue("", { onlyself: true });
          this.updateMode = false;

        } else {
          this.toastrService.error(response.value, "Failed To Update Data!")
        }
      });
  }

  addLprCamera() {
    let data = this.form.value;
    //data.cameraGroupId = parseInt(data.cameraGroupId);
    //console.log(data);
    this.lprCameraService.addLprCamera(data)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value, "Data Added Successfully!");
          this.getAllLprCamera();
          this.form.reset();
          this.form.controls["cameraGroupId"].setValue("", { onlyself: true });
        } else {
          this.toastrService.error(response.value, "Failed To Add Data!");
        }
      });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  resetForm(){
    this.form.reset();
    this.updateMode = false;
  }

excelSheetDownload() {
  let dataForExcel = [];

  this.dataSource.data.forEach((row: any) => {
    let rowData: any = [row.cameraName, row.cameraCode,row.cameraStreamPath, row.cameraDescription,row.cameraGroupName]
    dataForExcel.push(rowData);
  });

  let reportData = {
    title: this.title,
    data: dataForExcel,
    headers: ['Camera Name', 'Camera Code','Camera Stream Path','Camera Description','Camera Group Name']
  };

  this.excelExportDataService.exportExcel(reportData)
}



}
