import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { first } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { TokenStorage } from 'src/app/util/token.storage';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { licenseExpiryService } from 'src/app/services/license-expiry.service';
import { AddlicenseExpiryDialogComponent } from './add-license-expiry-dialog/add-license-expiry-dialog.component';
import { UpdateLicenseExpiryDialogComponent } from './update-license-expiry-dialog/update-license-expiry-dialog.component';
import { WebConstants } from "../../../util/web.constants";
export interface licenseExpiry {
  id: number;
  organizationName: string;
  expiryDate: Date;
  status: number;
}
@Component({
  selector: 'app-license-expiry',
  templateUrl: './license-expiry.component.html',
  styleUrls: ['./license-expiry.component.scss']
})
export class licenseExpiryComponent implements OnInit {
  public displayedColumns: string[] = [
    'organizationName',
    'expiryDate',
    'status',
    'actions'
  ]; public dataSource = new MatTableDataSource<licenseExpiry>();
  public licenseExpiryList: licenseExpiry[] = [];
  public tempId: number;
  
  public title: string = "License Expiry Management";

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  userList: any;

  constructor(
    public dialog: MatDialog,
    public licenseExpiryService: licenseExpiryService,
    public tokenStorage: TokenStorage,
    public toastrService: ToastrService,
    private titleService: Title
  ) {
    this.titleService.setTitle(WebConstants.PROJECT_NAME + " | " + this.title)
  }

  ngOnInit(): void {
    this.loadlicenseExpiryData();
  }

  loadlicenseExpiryData(): void {
    this.licenseExpiryService.getAll()
      .pipe(first())
      .subscribe(response => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.licenseExpiryList = response.data;
          this.dataSource = new MatTableDataSource<licenseExpiry>(this.licenseExpiryList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.toastrService.error(response.value, "Failed To Load Data!");
        }
      });
  }



  applyFilter(searchValue: string) {
    this.dataSource.filter = searchValue;
  }

  addExpiryDialog(): void {
    const dialogRef = this.dialog.open(AddlicenseExpiryDialogComponent, {
      data: null,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loadlicenseExpiryData();
      }
    });
  }

  updateExpiryDialog(data: licenseExpiry): void {
    console.log('Data before opening dialog:', data); 

    const dialogRef = this.dialog.open(UpdateLicenseExpiryDialogComponent, {
      data: data,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loadlicenseExpiryData();
      }
      
    });
  }

  getTempId(obj: licenseExpiry): void {
    this.tempId = obj.id;  
  }
 
  // deletelicenseExpiry(licenseExpiry) {
  //   if((this.userList.filter(x=>x.licenseExpiryId == licenseExpiry.id).length)>0){
  //     this.toastrService.error("This Organization Contain Users");
  //   }
  //   else{
  //     this.licenseExpiryService.deletelicenseExpiry(licenseExpiry.id)
  //       .pipe(first())
  //       .subscribe(response => {
  //         if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
  //           this.toastrService.success(response.value,"Deleted Successfully!");

  //           if (this.tokenStorage.getRole() != "ROLE_SUPER_ADMIN") {
  //             this.loadlicenseExpiryData();
  //           } 
  //         } else {
  //           this.toastrService.error(response.value,"Failed To Delete Data!")
  //         }
  //       });
  //     }
  //   }
  deletelicenseExpiry(): void {
    if (this.tempId !== undefined) {
      this.licenseExpiryService.deletelicenseExpiry(this.tempId)
        .pipe(first())
        .subscribe(response => {
          if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
            this.toastrService.success(response.value, "Deleted Successfully!");
            this.loadlicenseExpiryData();  // Refresh data after deletion
          } else {
            this.toastrService.error(response.value, "Failed To Delete Data!");
          }
        });
    }
  }
  
}

