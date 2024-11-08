import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LookupService } from 'src/app/services/lookup.service';
import { LprRawDataService } from 'src/app/services/lpr-raw-data-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lpr-raw-data-dialog',
  templateUrl: './lpr-raw-data-dialog.component.html',
  styleUrls: ['./lpr-raw-data-dialog.component.scss']
})
export class LprRawDataDialogComponent implements OnInit {
  public allActionObject: any = null;
 
  constructor(public dialog: MatDialogRef<LprRawDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public lookupService: LookupService,
    public lprRawDataService: LprRawDataService,
    public toastrService: ToastrService) {
    this.init(data);
  }

  ngOnInit(): void {
  }

  init(data: any): void {
    this.allActionObject = data;
  }

  closeDialog(): void {
    this.dialog.close();
  }

}
