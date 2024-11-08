import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { licenseExpiry } from '../license-expiry.component';
import { UpdateLicenseExpiryDialogComponent } from '../update-license-expiry-dialog/update-license-expiry-dialog.component';
import { licenseExpiryService } from 'src/app/services/license-expiry.service';
import { WebConstants } from 'src/app/util/web.constants';
@Component({
  selector: 'app-license-table',
  templateUrl: './license-table.component.html',
  styleUrls: ['./license-table.component.scss']
})
export class LicenseTableComponent implements OnInit {
  @Input() dataSource: MatTableDataSource<licenseExpiry>;
  @Input() displayedColumns: string[] = ['organizationName', 'expiryDate', 'status', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  public tempId: number;
  public licenseExpiryList: licenseExpiry[] = [];
  constructor(
    public dialog: MatDialog,
    public licenseExpiryService: licenseExpiryService,
    public toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updateExpiryDialog(element: licenseExpiry): void {
    const dialogRef = this.dialog.open(UpdateLicenseExpiryDialogComponent, {
      data: element,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loadlicenseExpiryData();
      }
    });
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
  getTempId(element: licenseExpiry): void {
    this.tempId = element.id;
  }

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
