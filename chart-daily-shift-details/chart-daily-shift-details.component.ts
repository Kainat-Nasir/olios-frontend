import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization.service';
import { first } from 'rxjs/operators';
import { WebConstants } from '../../../util/web.constants';
import { ToastrService } from 'ngx-toastr';
import { LprDataService } from 'src/app/services/lpr-data.service';
import { BaseChartDirective } from 'ng2-charts';
import { ExcelExportDataService } from 'src/app/excelService/excel-export-data.service';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-chart-daily-shift-details',
  templateUrl: './chart-daily-shift-details.component.html',
  styleUrls: ['./chart-daily-shift-details.component.scss']
})
export class ChartDailyShiftDetailsComponent implements OnInit {

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective; // Now you can reference your chart via `this.chart`

  constructor(
    public organizationService: OrganizationService,
    public toastrService: ToastrService,
    public lprdataservice: LprDataService,
    public excelExportDataService: ExcelExportDataService,
    private titleService:Title
  ) {
    this.titleService.setTitle(WebConstants.PROJECT_NAME + " | " + WebConstants.PAGE_TITLE.CHART)
  }

  public orgSelect;
  public currentOrgId;
  public orgData: any;
  public currentOrgStatsData: any;
  public selected: {start, end} = {start:moment().subtract(6, 'days'), end:moment()};

  public myoption = {
    tooltips: {
      enabled: true
    },
    hover: {
      animationDuration: 1
    },
    animation: {
    duration: 1,
    onComplete: function () {
      var chartInstance = this.chart,
        ctx = chartInstance.ctx;
        ctx.textAlign = 'center';
        // ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.textBaseline = 'bottom';
        this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
            var data = dataset.data[index];
            ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
        });
      }
    }
  };


  public chartData: any = [];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [], label: 'Total Shifts'},
    {data: [], label: 'Total Scans'},
    {data: [], label: 'Total Hitlist'}
  ];


  ngOnInit() {
    this.findAllOrganization();
  }

  findAllOrganization(): void {
    this.organizationService.getAll()
    .pipe(first())
    .subscribe(response => {

      if(response && response.code == WebConstants.STATUS.CODE_SUCCESS){
        this.orgData = response.data;
      }
       else{
        this.toastrService.error(response.value, "Failed To Load Data!")
      }
    })
  }


  findCurrentOrganizationData(payload): void {
    this.lprdataservice.ShiftStatsDataDaily(payload)
    .pipe(first())
    .subscribe(response => {
      if(response && response.code == WebConstants.STATUS.CODE_SUCCESS){
        this.currentOrgStatsData = response.data;
        this.setNewValuesToChart();
      }
       else{
        this.toastrService.error(response.value, "Failed To Load Data!")
      }
    })
  }


  setNewValuesToChart(): void {
    this.barChartLabels = [];
    this.barChartData = [
      {data: [], label: 'Shifts'},
      {data: [], label: 'Scans'},
      {data: [], label: 'Permitted'},
      {data: [], label: 'Authorized'},
      {data: [], label: 'Expired'},
      {data: [], label: 'Unauthorized'},
      {data: [], label: 'Unpaid'}
    ];
    this.chartData = this.currentOrgStatsData
    console.log(this.chartData);

    for(let i=0; i<this.chartData.length; i++){
      this.barChartLabels[i] = this.chartData[i]['month'];

      this.barChartData[0].data[i] = this.chartData[i]['totalShifts']
      this.barChartData[1].data[i] = this.chartData[i]['totalScans']
      this.barChartData[2].data[i] = this.chartData[i]['totalHitlist']
    }

    this.chart.chart.update();
  }


  searchOrgData(): void {

    if(!this.currentOrgId){
      this.toastrService.error("Please Select Organization", "Failed To Load Chart!")
      return;
    }

    this.findCurrentOrganizationData({
      "sessionStartString": this.selected.start.format("MM-DD-YYYY"),
      "sessionEndString": this.selected.end.format("MM-DD-YYYY"),
      "licencePlateNumber":"",
      "organizationId": this.currentOrgId
    });
  }

  selectOrg(orgId): void{
    this.currentOrgId = orgId;
  }

  excelSheetDownload(): void{

    if(!this.currentOrgStatsData){
      this.toastrService.error("No Data Found", "Failed To Export CSV!")
      return;
    }

    let dataForExcel = [];

    this.currentOrgStatsData.forEach((row: any) => {
      let rowData: any = [row.month, row.totalShifts, row.totalScans, row.totalHitlist]
      dataForExcel.push(rowData);
    });

    let reportData = {
      title: "Daily Shift Statistics",
      data: dataForExcel,
      headers: ['Date', 'Total Shifts', 'Total Scans','Total Hits']
    };

    this.excelExportDataService.exportExcel(reportData)
  }

  downloadChartImage(event):void{

    if(!this.currentOrgStatsData){
      this.toastrService.error("No Data Found", "Failed To Export PNG!")
      return;
    }

    var anchor = event.target;
    anchor.href = document.getElementsByTagName('canvas')[0].toDataURL();
    anchor.download = "Daily_Statistics.png";
  }
}
