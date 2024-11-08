import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { WebConstants } from "src/app/util/web.constants";
import { TokenStorage } from "src/app/util/token.storage";
import { LprDataService } from "src/app/services/lpr-data.service";
import { first } from "rxjs/operators";
import { BaseChartDirective } from "ng2-charts";
import * as Chart from "chart.js";
import * as moment from "moment";
import { UserService } from "src/app/services/user.service";
import { ToastrService } from "ngx-toastr";
import { DashboardService } from "src/app/services/dashboard.service";
import { ExcelExportDataService } from "src/app/excelService/excel-export-data.service";
import { OrganizationService } from "src/app/services/organization.service";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Title } from '@angular/platform-browser';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  title: string = WebConstants.MENU_NAMES.DASHBOARD;
  userRole: any;

  shiftData: [];
  checkTodayData: boolean = false;
  todayShifts: number = 0;
  todayScans: number = 0;
  todayHitlist: number = 0;
  todayPotentialTargetDetected: number = 0;
  todayNotMatched: number = 0;
  peoList: any[] = [];
  selectedDateCustom: { start: moment.Moment; end: moment.Moment };
  selectedTabIndex: any = 0;
  barThickness: any = 50;
  liveSectionBarChart: any;
  barBackgroundColor: any = "rgba(218, 165, 32, 1)";
  chartLine: any;
  targetDetected: number = 0;
  potentialTargetDetected: number = 0;
  targetDetectedProgressBar: any = "100%";
  potentialTargetDetectedProgressBar: any = "55%";
  totalViolation: number = 0;
  selectedPeoId: any = null;

  violationLineChartLable = [];
  violationLineChartData = [];

  totalViolationData = [];
  violationByPeo = [];

  selectedDivElemetRef: any;

  //Export Data
  currentOrgId: any;
  currentOrgData: any;
  dataForExport: any;
  analyticsType: any;
  headerForExport = [];
  dataForCsvPdf = [];
  dateRangeForExport: any;

  liveChartReportHeader: any = [
    "Date",
    "Shifts",
    "Scans",
    "Not Matched",
    "Target Detected",
    "Potential Detected",
  ];

  violationTrendReportHeader: any = ["Date/Time", "Total Violations"];

  violationInsightReportHeader: any = ["Target Detected", "Potential Detected"];

  peoViolationReportHeader: any = ["PEO", "Violation Percentage"];

  peoLastLocationReportHeader: any = ["PEO", "Latitude", "Longitude"];

  liveSectionExportData: any = {};

  selectedPeoIndex: any = 0;
  peoLastLocationData: any = [];
  selectedPeoLocation: any = {
    latitude: 0,
    longitude: 0,
  };

  markerIcon = {
    url: "assets/images/peo_marker.png",
    scaledSize: {
      width: 50,
      height: 70,
    },
  };

  //AGM MAP
  infoOpen = false;
  private map: google.maps.Map | null = null;
  private heatmap: google.maps.visualization.HeatmapLayer | null = null;

  constructor(
    private tokenStorage: TokenStorage,
    private lprdataservice: LprDataService,
    private userService: UserService,
    private toastrService: ToastrService,
    private dashboardService: DashboardService,
    private excelExportDataService: ExcelExportDataService,
    private organizationService: OrganizationService,
    private titleService:Title
  ) {
    this.titleService.setTitle(WebConstants.PROJECT_NAME + " | " + WebConstants.PAGE_TITLE.DASHBOARD)
  }

  @ViewChild("liveSectionBarChart", { static: false })
  liveSectionBarChartRef!: ElementRef;
  @ViewChild("violationTrendsCanvas") violationTrendsCanvas: ElementRef;
  @ViewChild("scannedViolationByPeoCanvas")
  scannedViolationByPeoCanvas: ElementRef;
  @ViewChild("canvas") canvas: ElementRef;
  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective;

  ngOnInit(): void {
    this.userRole = this.tokenStorage.getRole();
    this.currentOrgId = this.tokenStorage.getOrganizationId();
    this.getAllUsers()
      .then(() => {
        this.getShiftData(
          moment().subtract(0, "days"),
          moment(),
          this.selectedPeoId
        );
      })
      .catch((error) => {
        console.error("Error during initialization", error);
      });

    this.getPeoLastLocation();
    this.getOrganizationDetailById();
  }

  ngAfterViewInit() {
    this.createViolationSectionLineChart();
  }

  getShiftData(startDate, endDate, peoID) {
    this.lprdataservice
      .LprShiftData({
        sessionStartString: moment(startDate).format("MM-DD-YYYY"),
        sessionEndString: moment(endDate).format("MM-DD-YYYY"),
      })
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.targetDetected = 0;
          this.potentialTargetDetected = 0;
          this.totalViolation = 0;
          this.totalViolationData = [];

          this.shiftData = response.data.filter((obj) => obj.data);

          this.violationLineChartLable = [];
          this.shiftData.forEach((d: any) => {
            for (var i = 0; i < d.data.length; i++) {
              if (
                d.data[i].matchedListType === "Full Match" ||
                d.data[i].matchedListType === "Partial Match"
              ) {
                ++this.totalViolation;
                this.totalViolationData.push(d.data[i]);
                if (d.data[i].matchedListType === "Full Match") {
                  ++this.targetDetected;
                } else {
                  ++this.potentialTargetDetected;
                }

                if (this.selectedTabIndex != 0) {
                  if (peoID != null && !Number.isNaN(peoID)) {
                    if (peoID === d.data[i].createdBy) {
                      this.violationLineChartLable.push(
                        moment(d.data[i].createdDate).format("DD-MM-YYYY")
                      );
                    }
                  } else {
                    this.violationLineChartLable.push(
                      moment(d.data[i].createdDate).format("DD-MM-YYYY")
                    );
                  }
                } else {
                  if (peoID != null && !Number.isNaN(peoID)) {
                    if (peoID === d.data[i].createdBy) {
                      this.violationLineChartLable.push(
                        moment(d.data[i].createdDate).format("hhA")
                      );
                    }
                  } else {
                    this.violationLineChartLable.push(
                      moment(d.data[i].createdDate).format("hhA")
                    );
                  }
                }
              }
            }
          });

          if (peoID != null && !Number.isNaN(peoID)) {
            this.totalViolation = this.totalViolationData.filter(
              (v) => v.createdBy === parseInt(peoID)
            ).length;
            this.targetDetected = this.totalViolationData.filter(
              (v) =>
                v.createdBy === parseInt(peoID) &&
                v.matchedListType === "Full Match"
            ).length;
            this.potentialTargetDetected = this.totalViolationData.filter(
              (v) =>
                v.createdBy === parseInt(peoID) &&
                v.matchedListType != "Full Match"
            ).length;
          }

          this.violationLineChartData = this.violationLineChartLable.reduce(
            (acc, date) => {
              acc[date] = (acc[date] || 0) + 1;
              return acc;
            },
            {}
          );

          if (this.selectedTabIndex === 0) {
            this.createChartDataDaily(this.violationLineChartData);
          } else {
            this.createChartData(this.violationLineChartData);
          }

          this.createViolationSectionLineChart();

          if (!this.checkTodayData) {
            this.todayShiftData(response.data);
          }

          this.violationInsightsPercentage(
            this.totalViolation,
            this.targetDetected,
            this.potentialTargetDetected
          );

          this.violationDataByPeo();
        }
      });
  }

  searchByPeo() {
    this.getViolationOnTabChange(this.selectedTabIndex);
  }

  violationDataByPeo() {
    this.violationByPeo = [];
    this.peoList.forEach((peo) => {
      let totalPeoViolations = this.totalViolationData.filter(
        (x) => x.userId === peo.userId
      ).length;
      let violationPercentage = parseFloat(
        ((totalPeoViolations / this.totalViolationData.length) * 100).toString()
      ).toFixed(2);
      let peoViolations = {
        peoID: peo.userId,
        peoName: peo.firstName + " " + peo.lastName,
        totalViolations: totalPeoViolations,
        violationPercentage: isNaN(parseFloat(violationPercentage))
          ? 0
          : parseFloat(violationPercentage) + "%",
      };
      this.violationByPeo.push(peoViolations);
    });
  }

  violationInsightsPercentage(
    totalViolation,
    targetDetected,
    potentialTargetDetected
  ) {
    let targetDetectedPercentage = parseFloat(
      ((targetDetected / totalViolation) * 100).toString()
    ).toFixed(2);
    let potentialTargetDetectedPercentage = parseFloat(
      ((potentialTargetDetected / totalViolation) * 100).toString()
    ).toFixed(2);

    this.targetDetectedProgressBar =
      targetDetectedPercentage != "NaN" ? targetDetectedPercentage + "%" : "0%";
    this.potentialTargetDetectedProgressBar =
      potentialTargetDetectedPercentage != "NaN"
        ? potentialTargetDetectedPercentage + "%"
        : "0%";
  }

  createChartDataDaily(times: { [key: string]: any }) {
    // Convert object to an array of [key, value] pairs
    const timeArray = Object.entries(times);

    // Sort the array using a custom comparator for AM/PM times
    timeArray.sort(([timeA], [timeB]) => {
      const timeTo24Hour = (time: string) => {
        const [hour, modifier] = time.split(/(?=[AP]M)/);
        let hour24 = parseInt(hour);
        if (modifier === "PM" && hour24 !== 12) {
          hour24 += 12;
        } else if (modifier === "AM" && hour24 === 12) {
          hour24 = 0;
        }
        return hour24;
      };

      return timeTo24Hour(timeA) - timeTo24Hour(timeB);
    });

    // Extract sorted labels and data
    this.violationLineChartLable = timeArray.map(([key]) => key);
    this.violationLineChartData = timeArray.map(([, value]) => value);
  }

  createChartData(dataObject: { [key: string]: any }) {
    const dataArray = Object.entries(dataObject);

    // Sort the array by date
    dataArray.sort(([dateA], [dateB]) => {
      return new Date(dateA).getTime() - new Date(dateB).getTime();
    });

    // Extract sorted labels and data
    this.violationLineChartLable = dataArray.map(([key]) => key);
    this.violationLineChartData = dataArray.map(([, value]) => value);
  }

  todayShiftData(data) {
    this.todayShifts = data.length;
    this.todayScans = data.reduce((accumulator, item) => {
      return (accumulator += item.totalScan);
    }, 0);

    data.forEach((d) => {
      if (d.data != null) {
        for (var i = 0; i < d.data.length; i++) {
          if (d.data[i].matchedListType === "Full Match") {
            ++this.todayHitlist;
          } else if (d.data[i].matchedListType === "Partial Match") {
            ++this.todayPotentialTargetDetected;
          } else {
            ++this.todayNotMatched;
          }
        }
      }
    });
    this.createLiveSectionBarChart();
    this.checkTodayData = true;

    this.liveSectionExportData = {
      todayShifts: this.todayShifts,
      todayScans: this.todayScans,
      todayNotMatched: this.todayNotMatched,
      todayHitlist: this.todayHitlist,
      todayPotentialTargetDetected: this.todayPotentialTargetDetected,
    };
  }

  createLiveSectionBarChart() {
    if (this.liveSectionBarChart) {
      this.liveSectionBarChart.destroy();
    }

    let labels = [
      "Scans",
      "Not Matched",
      "Target Detected",
      "Potential Detected",
    ];
    let data = [
      this.todayScans,
      this.todayNotMatched,
      this.todayHitlist,
      this.todayPotentialTargetDetected,
    ];

    let dataset = {
      labels: labels,
      datasets: [
        {
          data: data,
          label: "Count",
          barThickness: this.barThickness,
          backgroundColor: this.barBackgroundColor,
        },
      ],
    };

    this.liveSectionBarChart = new Chart("liveSectionBarChart", {
      type: "bar",
      data: dataset,
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  getAllUsers(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.userService
        .getAll()
        .pipe(first())
        .subscribe(
          (response) => {
            if (
              response &&
              response.code === WebConstants.STATUS.CODE_SUCCESS
            ) {
              response.data.forEach((user) => {
                if (
                  user.roleId === 13 &&
                  user.status === 1 &&
                  !this.peoList.includes(user.userId)
                ) {
                  this.peoList.push(user);
                }
              });
              resolve();
            } else {
              this.toastrService.error(response.value, "Failed To Load Data!");
              reject(new Error("Failed To Load Data")); // Reject the promise on error
            }
          },
          (error) => {
            console.error("Error getting users", error);
            reject(error); // Reject the promise on error
          }
        );
    });
  }

  onTabChanged(event: any) {
    this.selectedTabIndex = event.index;
    this.getViolationOnTabChange(this.selectedTabIndex);
  }

  getViolationOnTabChange(selectedTab) {
    if (selectedTab == 0) {
      this.getShiftData(
        moment().subtract(0, "days"),
        moment(),
        parseInt(this.selectedPeoId)
      );
    } else if (selectedTab == 1) {
      this.getShiftData(
        moment().subtract(6, "days"),
        moment(),
        parseInt(this.selectedPeoId)
      );
    } else if (selectedTab == 2) {
      this.getShiftData(
        moment().subtract(31, "days"),
        moment(),
        parseInt(this.selectedPeoId)
      );
    }
  }

  createViolationSectionLineChart() {
    if (this.chartLine) {
      this.chartLine.destroy();
    }

    this.chartLine = new Chart("violationSectionLineChart", {
      type: "line", //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.violationLineChartLable,
        datasets: [
          {
            label: "Violations",
            data: this.violationLineChartData,
            borderColor: "rgba(218,165,32,1)",
            lineTension: 0.5,
            radius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2.5,
        legend: {
          display: true,
          position: "top",
          labels: {
            fontColor: "#999",
            fontSize: 14,
          },
        },
      },
    });
  }

  onChangeDateRange(event: any) {
    if (event.start && event.end) {
      this.getShiftData(event.start, event.end, this.selectedPeoId);
      this.dateRangeForExport =
        moment(event.start).format("DD-MM-YYYY") +
        " - " +
        moment(event.end).format("DD-MM-YYYY");
    }
  }

  onChangePeoId(peoId: any) {
    this.selectedPeoId = peoId;
  }

  onPeoMapTabChanged(event: any) {
    this.selectedPeoIndex = event.index;
    this.selectedPeoLocation = { latitude: 0, longitude: 0 };

    setTimeout(() => {
      if (this.selectedPeoIndex != 0) {
        this.selectedPeoLocation =
          this.peoLastLocationData[this.selectedPeoIndex - 1];
      } else {
        this.selectedPeoLocation = this.peoLastLocationData[0];
      }
    }, 100);
  }

  onPeoMapTabClicked() {
    let event: any = { index: this.selectedPeoIndex };
    this.onPeoMapTabChanged(event);
  }

  getPeoLastLocation() {
    this.dashboardService
      .getPeoLastLocation()
      .pipe(first())
      .subscribe((response) => {
        this.peoLastLocationData = response.data;
        this.selectedPeoLocation = this.peoLastLocationData[0];
      });
  }

  getOrganizationDetailById() {
    this.organizationService
      .getOrganizationDetailById(this.currentOrgId)
      .pipe(first())
      .subscribe((response) => {
        if (response && response.code === WebConstants.STATUS.CODE_SUCCESS) {
          this.currentOrgData = response.data;
        }
      });
  }

  //done

  setExportData(
    expoerHeader: any,
    exportData: any,
    divElementRef: any,
    analyticsType: any
  ) {
    this.dataForExport = exportData;
    this.analyticsType = analyticsType;
    this.selectedDivElemetRef = divElementRef;

    if (!this.dataForExport) {
      this.toastrService.error("No Data Found", "Failed To Export CSV!");
      return;
    }

    this.dataForCsvPdf = [];
    this.headerForExport = expoerHeader;

    if (this.analyticsType == "LIVE") {
      let row = this.dataForExport;
      let rowData: any = [
        moment().format("MM-DD-YYYY"),
        row.todayShifts,
        row.todayScans,
        row.todayNotMatched,
        row.todayHitlist,
        row.todayPotentialTargetDetected,
      ];
      this.dataForCsvPdf.push(rowData);
      this.dateRangeForExport = null;
    }

    if (this.analyticsType != "LIVE") {
      if (this.selectedTabIndex == 0) {
        this.dateRangeForExport =
          moment().format("MM-DD-YYYY") +
          " - " +
          moment().subtract(0, "days").format("MM-DD-YYYY");
      } else if (this.selectedTabIndex == 1) {
        this.dateRangeForExport =
          moment().format("MM-DD-YYYY") +
          " - " +
          moment().subtract(6, "days").format("MM-DD-YYYY");
      } else if (this.selectedTabIndex == 2) {
        this.dateRangeForExport =
          moment().format("MM-DD-YYYY") +
          " - " +
          moment().subtract(31, "days").format("MM-DD-YYYY");
      } else {
        this.dateRangeForExport;
      }
    }

    if (this.analyticsType == "Violation Trends") {
      this.violationLineChartLable.forEach((data, i) => {
        let violationTrends = [data, this.dataForExport[i]];
        this.dataForCsvPdf.push(violationTrends);
      });
    }
    if (this.analyticsType == "Violation Insights") {
      this.dataForCsvPdf = [
        [this.targetDetected, this.targetDetectedProgressBar],
        [this.potentialTargetDetected, this.potentialTargetDetectedProgressBar],
      ];
    }
    if (this.analyticsType == "Scanned Violations By PEO") {
      this.dataForExport.forEach((peoData) => {
        let peoViolationPercentage = [
          peoData.peoName,
          peoData.violationPercentage,
        ];
        this.dataForCsvPdf.push(peoViolationPercentage);
      });
    }
    if (this.analyticsType == "Vehicle Location Map") {
      this.dataForExport.forEach((peoData) => {
        let peoViolationPercentage = [
          peoData.peoName,
          peoData.latitude,
          peoData.longitude,
        ];
        this.dataForCsvPdf.push(peoViolationPercentage);

        this.dateRangeForExport = [];
      });
    }
  }

  exportExcelAll(): void {
    let reportData = {
      title: this.analyticsType + " - " + this.currentOrgData.name,
      data: this.dataForCsvPdf,
      headers: this.headerForExport,
      dateRange: this.dateRangeForExport,
    };

    this.excelExportDataService.exportExcel(reportData);
  }

  exportPdfAll() {
    const doc = new jsPDF();

    if (this.dateRangeForExport) {
      doc.text(this.dateRangeForExport, 75, 15);
    } else {
      doc.text("", 75, 15);
    }

    autoTable(doc, { html: "#my-table" });

    autoTable(doc, {
      head: [this.headerForExport],
      body: this.dataForCsvPdf,
    });

    doc.save(this.analyticsType + " - " + this.currentOrgData.name + ".pdf");
  }

  violationSectionLineChartData: any = [];
  violationSectionBarChartData: any = [];
}
