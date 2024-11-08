import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { LprRawDataService } from 'src/app/services/lpr-raw-data-service';
import { first } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { NzI18nService, en_US } from 'ng-zorro-antd/i18n';
import { WebConstants } from 'src/app/util/web.constants';
import { FormGroup, FormControl } from '@angular/forms';
import { TokenStorage } from 'src/app/util/token.storage';
import { ToastrService } from 'ngx-toastr';
import { ExcelExportDataService } from 'src/app/excelService/excel-export-data.service';
import { Title } from '@angular/platform-browser';



export interface LprRawData {
  payloadId: string;
  formattedDate: any;
  licenceNumber: string;
  patrollingSessionId: any;
  partialMatchLicenceNumber: string;
  partialMatchPercentage: any;
  matchedStatus: string;
  matchedListType: string;
  latitude: any;
  longitude: any;
}

@Component({
  selector: 'app-lpr-raw-data',
  templateUrl: './lpr-raw-data.component.html',
  styleUrls: ['./lpr-raw-data.component.scss']
})

export class LprRawDataComponent implements OnInit {
  public displayedColumns: String[] = [
    "image",
    "payloadId",
    "formattedDate",
    "patrollingSessionId",
    "licenceNumber",
    "partialMatchLicenceNumber",
    "partialMatchPercentage",
    "matchedStatus",
    "latlong"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public form: any;
  public dataTableList: any[] = [];
  public dataSource = new MatTableDataSource();
  public dataSourceLazy: any[] = [];
  public start: number = 0;
  public limit: number = 15;
  public end: number = this.limit + this.start;
  public ngSize = "default";
  public page = 0;
  public size = 30;

  constructor( public lprRawDataService: LprRawDataService,
    public datePipe: DatePipe,
    private i18n: NzI18nService,
    public dialog: MatDialog,
    public tokenStorage: TokenStorage,
    public excelExportDataService: ExcelExportDataService,
    public toastrService: ToastrService,
    private titleService:Title) {
      this.titleService.setTitle(WebConstants.PROJECT_NAME + " | " + WebConstants.PAGE_TITLE.CHART)
      this.i18n.setLocale(en_US);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      image: new FormControl(""),
      details: new FormControl(""),
      extraDetails: new FormControl("")
    });

    this.dataSource = new MatTableDataSource<LprRawData>();
    this.dataSource.filterPredicate = (data: LprRawData, filter) => {
      let tempFilter = filter.trim().toLowerCase();
      return (
        (data.payloadId && data.payloadId.trim().toLowerCase().indexOf(tempFilter) !== -1)
        || (data.formattedDate && data.formattedDate.trim().toLowerCase().indexOf(tempFilter) !== -1)
        || (data.licenceNumber && data.licenceNumber.trim().toLowerCase().indexOf(tempFilter) !== -1)
        || (data.patrollingSessionId && data.patrollingSessionId.toString().indexOf(tempFilter) !== -1)
        || (data.partialMatchLicenceNumber && data.partialMatchLicenceNumber.trim().toLowerCase().indexOf(tempFilter) !== -1)
        || (data.matchedListType && data.matchedListType.trim().toLowerCase().indexOf(tempFilter) !== -1)
        || (data.matchedStatus && data.matchedStatus.trim().toLowerCase().indexOf(tempFilter) !== -1)
      );
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, attribute) => data[attribute];

    this.init();
  }

  ngAfterViewInit(){
    this.paginator.page.subscribe(res=>{
      //console.log("Pagination Subscriber ",res);
      if(res && res.length - (res.pageIndex * res.pageSize) <= res.pageSize){
        //console.log("last Page call the api ");
        this.getLprRawDataByPagination();
      }
    })
  }

  init(): void {
    this.getLprRawDataByPagination();
  }

  getLprRawDataByPagination(): void {
    // //console.log("Page {} size {} ",this.page,this.size);
    this.lprRawDataService.LprRawDataService(this.page, this.size)
      .pipe(first())
      .subscribe(response => {
        if (response.code === WebConstants.STATUS.CODE_SUCCESS) {
          if (response.data && response.data.length > WebConstants.INT_ZERO) {
            this.page++;
            let dataList = response.data;
            for(let i=0; i< dataList.length; i++){
              let data = dataList[i].data;
              let index = this.dataTableList.length;
              let dateArr = dataList[i].data.date.split("-")
              let timeArr = dataList[i].data.time.split("-")
              let dateFormat = dateArr[1] + '/' + dateArr[2] +'/' + dateArr[0] + ' ' + timeArr[0] + ':' + timeArr[1];
              data.formattedDate = dateFormat;

              this.dataTableList.push(data);
              this.getLprRawDataImageByPayloadId(data.payloadId,index)
            }
            this.dataSource.data = this.dataTableList;
          }
        }
      });
  }

  getLprRawDataImageByPayloadId(payloadId: any, index: number): void {
    this.lprRawDataService.LprRawDataFindImageByPayloadId(payloadId)
      .pipe(first())
      .subscribe(response => {
        if (response.code === WebConstants.STATUS.CODE_SUCCESS) {
          if (response.data && response.data ) {
            let data = response.data;
            if(data.image1 && data.image1 != undefined && data.image1 !== ""){
              this.dataTableList[index].image1 = "data:image/jpeg;base64,"+ data.image1;
            }else{
              this.dataTableList[index].image1 = null;
            }
            this.dataSource.data = this.dataTableList;
          }
        }
      });
  }

  excelSheetDownload() {
    let dataForExcel = [];

    this.dataSource.data.forEach((row: any) => {
      let rowData: any = [row.payloadId, row.formattedDate, row.patrollingSessionId,row.licenceNumber,row.partialMatchLicenceNumber,row.partialMatchPercentage,row.matchedStatus+" with "+row.matchedListType,row.latitude,row.longitude]
      dataForExcel.push(rowData);
    });

    let reportData = {
      title: 'LPR Session Data',
      data: dataForExcel,
      headers: ['Payload Id', 'Formatted Date', 'Patrolling Session Id','Licence Number','Partial Match Licence Number','Partial Match Percentage','Matched Status','Latitude','Longitude']
    };

    this.excelExportDataService.exportExcel(reportData)
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

}
