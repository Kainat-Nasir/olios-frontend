import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WebConstants } from 'src/app/util/web.constants';
import { first } from 'rxjs/operators';
import { LookupService } from 'src/app/services/lookup.service';
import { ToastrService } from 'ngx-toastr';
import { LprDataService } from 'src/app/services/lpr-data.service';
@Component({
  selector: 'app-search-lpr-violation-dialog',
  templateUrl: './search-lpr-violation-dialog.component.html',
  styleUrls: ['./search-lpr-violation-dialog.component.scss']
})
export class SearchLprViolationDialogComponent implements OnInit {
  public pastActionObject: any = null;
  public imageDataLink: any = null;
  
  constructor(public dialog: MatDialogRef<SearchLprViolationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public lookupService: LookupService,
    public lprDataService: LprDataService,
    public toastrService: ToastrService) {
    this.init(data);
  }

  ngOnInit(): void {
  }

  init(data: any): void {
    this.pastActionObject = data;
    this.imageDataLink = this.pastActionObject.payloadId;
    ////console.log("this.expiredSessionObject={}", this.expiredSessionObject);

    this.lprDataService.searchLprViolationImageDetail(this.imageDataLink)
      .pipe(first())
      .subscribe(response => {
        if (response.code === WebConstants.STATUS.CODE_SUCCESS) {
          ////console.log("response={}", response);

          if (response.data !== null) {
            this.pastActionObject.image1 = (response.data.image1 === "") ? null : "data:image/jpeg;base64,"+ response.data.image1;
          } else {
            this.pastActionObject.image1 = null;
          }
        }
      });
  }
  closeDialog(): void {
    this.dialog.close();
  }
}
