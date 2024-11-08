import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource, MatDialog } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { TokenStorage } from 'src/app/util/token.storage';
import { ToastrService } from 'ngx-toastr';
import { LprAddPropertyDialogComponent } from './lpr-add-property-dialog/lpr-add-property-dialog.component';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { WebConstants } from 'src/app/util/web.constants';
import { LprSubPropertyAddComponent } from './lpr-sub-property-add/lpr-sub-property-add.component';
import { LprPropertyUpdateDialogComponent } from './lpr-property-update-dialog/lpr-property-update-dialog.component';
import { PropertyService } from 'src/app/services/property.service';
import { SubPropertyService } from 'src/app/services/sub-property.service';
import { ExcelExportDataService } from 'src/app/excelService/excel-export-data.service';

export interface Property {
  id: number;
  name: String;
  organizationName: String;
  organizationId: number;
  address: String;
  contact: String;
  latitude: number;
  longitude: number;
  status: number;
}


@Component({
  selector: 'app-lpr-property',
  templateUrl: './lpr-property.component.html',
  styleUrls: ['./lpr-property.component.scss']
})
export class LprPropertyComponent implements OnInit {

  public displayedColumns: string[] = [
    'name',
    'organizationName',
    'address',
    'contact',
    'latitude',
    'longitude',
    'actions'
  ];
  public dataSource = new MatTableDataSource();
  public allProperties: any[] = [];
  public tempId: any;
  public orgId: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router : Router,
    private propertyService: PropertyService,
    private subpropertyService: SubPropertyService,
    public tokenStorage: TokenStorage,
    public toastrService: ToastrService, public excelExportDataService: ExcelExportDataService) { 
      this.getAllProperty();
    }

  ngOnInit(): void {
    this.orgId = this.tokenStorage.getOrganizationId();
  }

  getAllProperty() {
    this.propertyService.getAll()
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.allProperties = response.data.filter(x=>x.organizationId == this.orgId);
          console.log(this.allProperties);
          this.dataSource = new MatTableDataSource<unknown>(this.allProperties);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          //console.log("response ",response.data);
        } else {
          this.toastrService.error(response.value,"Failed To Load Data!")
        }
      });
    }

  getTempId(obj: any){
    this.tempId = obj;
  }

  propertyDetail(data){
    //console.log(data);
    const dialogRef = this.dialog.open(LprSubPropertyAddComponent, 
    {
      width: "1500px",
      data: data,
    });
    
    dialogRef.afterClosed().subscribe(result => {
        this.getAllProperty();
    });
  }

  addPropertyDialog() {
    const dialogRef = this.dialog.open(LprAddPropertyDialogComponent, {
      width: "550px",
      data: null,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllProperty();
    });
  }

  updatePropertyDialog(data) {
    //console.log(data);
    const dialogRef = this.dialog.open(LprPropertyUpdateDialogComponent, {
      width: "550px",
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllProperty();
    });
  }

  deleteProperty(property: any) {
    this.propertyService.deletePropertyById(property.id)
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.toastrService.success(response.value,"Property Deleted Successfully!");
          this.getAllProperty();
        } else {
          this.toastrService.error(response.value,"Failed To Delete Data!")
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // author muazam ali
  excelSheetDownload() {
    let dataForExcel = [];

    this.dataSource.data.forEach((row: any) => {
      let rowData: any = [row.name, row.organizationName, row.address,row.contact,row.latitude,row.longitude,row.actions]
      dataForExcel.push(rowData);
    });

    let reportData = {
      title: 'LPR Property',
      data: dataForExcel,
      headers: ['name', 'organizationName', 'address','contact','latitude','longitude', 'actions']
    };

    this.excelExportDataService.exportExcel(reportData)
  }


}
