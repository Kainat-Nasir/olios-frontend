import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { LprCameraGroupService } from 'src/app/services/lpr-camera-group.service';
import { LprCameraService } from 'src/app/services/lpr-camera.service';
import { WebConstants } from 'src/app/util/web.constants';
import { ExcelExportDataService } from 'src/app/excelService/excel-export-data.service';
import { threadId } from 'worker_threads';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lpr-camera-group',
  templateUrl: './lpr-camera-group.component.html',
  styleUrls: ['./lpr-camera-group.component.scss']
})
export class LprCameraGroupComponent implements OnInit {

  public form : any;
  public dataSource = new MatTableDataSource();
  public updateMode : boolean = false;
  public updateId : number = null;
  public tempId: any;
  public cameraList: any;
  public displayedColumns: string[] = [
    'groupName',
    'groupDescription',
    'actions'
  ];
  public title: string = WebConstants.MENU_NAMES.CAMERA_GROUP;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public lprCameraService: LprCameraService, public lprCameraGroupService : LprCameraGroupService , public toastrService : ToastrService,public excelExportDataService: ExcelExportDataService,
    private titleService:Title
  ) {
    this.titleService.setTitle(WebConstants.PROJECT_NAME + " | " + WebConstants.PAGE_TITLE.CAMERA_GROUP_MANAGEMENT)
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      groupName : new FormControl("" , Validators.required),
      groupDescription : new FormControl("" , Validators.required),
    });
    this.getAllLprCamera();
    this.getAllGroups();
  }

  getTempId(obj: any){
    this.tempId = obj;
  }

  getAllLprCamera() {
    this.lprCameraService.getAllLprCamera()
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.cameraList = response.data;
        }
      });
    }

  getAllGroups(){
    this.lprCameraGroupService.getAllLprCameraGroup()
    .pipe(first())
    .subscribe(response => {
      if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
        //console.log("response ",response.data);
        let data = response.data;
        this.dataSource = new MatTableDataSource<unknown>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      } else {
        this.toastrService.error(response.value,"Failed To Load Data!")
      }
    });
  }

  deleteGroup(obj : any){
    if(this.cameraList.filter(x=>x.cameraGroupId == obj.id).length > 0){
      console.log(this.cameraList.filter(x=>x.cameraGroupId == obj.id).length);
      this.toastrService.error("This Camera Group Contains Camera List.");
    }
    else{
      this.lprCameraGroupService.deleteLprCameraGroup(obj.id)
      .pipe(first())
      .subscribe(response => {
        if(response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"Deleted Successfully!");
          this.getAllGroups();
        } else {
          this.toastrService.error(response.value,"Failed To Delete Data!")
        }
      });
    }
  }

  setUpdateMode(obj : any){
      this.updateMode = true;
      this.form.controls["groupName"].setValue(obj.groupName);
      this.form.controls["groupDescription"].setValue(obj.groupDescription);
      this.updateId = obj.id;
  }

  updateGroup(){
    let data = this.form.value;
    data.id = this.updateId;

    this.lprCameraGroupService.updateLprCamerGroup(data)
    .pipe(first())
    .subscribe(response => {
      if(response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
        this.toastrService.success(response.value,"Data Update Successfully!");
        this.getAllGroups();
        this.form.reset();
        this.updateMode = false;
      } else {
        this.toastrService.error(response.value,"Failed To Update Data!")
      }
    });
  }

  addGroup(){
    let data = this.form.value;

    this.lprCameraGroupService.addLprCameraGroup(data)
    .pipe(first())
    .subscribe(response => {
      if(response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
        this.toastrService.success(response.value,"Data Add Successfully!");
        this.getAllGroups();
        this.form.reset();
      } else {
        this.toastrService.error(response.value,"Failed To Add Data!")
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
// author muazam ali
  excelSheetDownload() {
    let dataForExcel = [];

    this.dataSource.data.forEach((row: any) => {
      let rowData: any = [row.groupName, row.groupDescription]
      dataForExcel.push(rowData);
    });

    let reportData = {
      title: this.title,
      data: dataForExcel,
      headers: ['Group Name', 'Group Description']
    };

    this.excelExportDataService.exportExcel(reportData)
  }

}
