import { Injectable } from "@angular/core";

/**
 * @author RIAZ JAFFARY
 */

@Injectable()
export class HighChartConfiguration {
  constructor() {
  }

  public occupancyCountChart(categoryList: any[], series: any, callback: Function): any {
    return {
      chart: {
        type: "column",
        marginTop: 20,
        height: "280",
        backgroundColor: "#26293b",
      },
      title: {
        text: null,
      },
      xAxis: {
        categories: categoryList,
        gridLineWidth: 0,
        minorGridLineWidth: 0,
      },
      yAxis: {
        tickInterval: 1,
        allowDecimals: false,
        min: 0,
        title: {
          text: "Count",
          style: {
            color: "#b1b1b5;",
          },
        },
        labels: {
          style: {
            color: "#b1b1b5;",
          },
        },
        gridLineColor: "#2d3042",
      },
      legend: {
        itemStyle: {
          color: "#b1b1b5;",
        },
        align: "center",
        verticalAlign: "top",
        layout: "horizontal",
        x: 20,
        y: -16,
      },
      tooltip: {
        headerFormat: "<b>{point.x}</b><br/>",
        pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
      },
      plotOptions: {
        column: {
          stacking: "normal",
        },
        series: {
          borderColor: null,
          point: {
            events: {
              click: callback,
            },
          },
        },
      },
      credits: {
        enabled: false,
      },
      series: series,
    };
  }

  public utilizationHourChart(totalHours: number, categoryList: any[], series: any, callback: Function): any {
    return {
      chart: {
        type: "column",
        marginTop: 20,
        height: "280",
        backgroundColor: "#26293b",
      },
      title: {
        text: null,
      },
      subtitle: {
        text: null,
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        categories: categoryList,
        gridLineWidth: 0,
        minorGridLineWidth: 0,
      },
      yAxis: {
        tickInterval: 1,
        allowDecimals: false,
        title: {
          text: "Hours",
          style: {
            color: "#b1b1b5;",
          },
        },
        labels: {
          style: {
            color: "#b1b1b5;",
          },
        },
        gridLineColor: "#2d3042",
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          borderColor: null,
          events: {
            click: callback,
          },
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of hours<br/>',
      },
      credits: {
        enabled: false,
      },
      labels: {
        items: [
          {
            html: "Total hours " + totalHours,
            style: {
              left: "0px",
              top: "0px",
              color: "white",
            },
          },
        ],
      },
      series: series,
    };
  }

  public expiredSessionChartHours(xAxisUnits: any, categoryList: any[], series: any, callback: Function): any {
    return {
      chart: {
        type: "column",
        marginTop: 20,
        height: "280",
        backgroundColor: "#26293b",
      },
      title: {
        text: null,
      },
      subtitle: {
        text: null,
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        type: "datetime",
        tickPixelInterval: 20,
        units: [["hour", [1]]],
      },
      yAxis: {
        tickInterval: 1,
        allowDecimals: false,
        title: {
          text: "Expired Sessions",
          style: {
            color: "#b1b1b5;",
          },
        },
        labels: {
          style: {
            color: "#b1b1b5;",
          },
        },
        gridLineColor: "#2d3042",
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          turboThreshold: 10000,
          borderWidth: 0,
          borderColor: null,
          events: {
            click: callback,
          },
        },
      },
      tooltip: {
        headerFormat: "Status: <b>{series.name}</b><br/>",
        pointFormat: "Datetime: <b>{point.x:%m-%d-%Y %H:%M:%S}</b> <br/> Occupancy Count: <b>{point.y:.2f}</b>",
      },
      credits: {
        enabled: false,
      },
      series: series,
    };
  }

  public expiredSessionChartDays(xAxisUnits: any, categoryList: any[], series: any, callback: Function): any {
    return {
      chart: {
        type: "column",
        marginTop: 20,
        height: "280",
        backgroundColor: "#26293b",
      },
      title: {
        text: null,
      },
      subtitle: {
        text: null,
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        type: "datetime",
        tickPixelInterval: 20,
        units: [["day", [1]]],
      },
      yAxis: {
        tickInterval: 1,
        allowDecimals: false,
        title: {
          text: "Expired Sessions",
          style: {
            color: "#b1b1b5;",
          },
        },
        labels: {
          style: {
            color: "#b1b1b5;",
          },
        },
        gridLineColor: "#2d3042",
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          turboThreshold: 10000,
          borderWidth: 0,
          borderColor: null,
          events: {
            click: callback,
          },
        },
      },
      tooltip: {
        headerFormat: "Status: <b>{series.name}</b><br/>",
        pointFormat:
          "Datetime: <b>{point.x:%m-%d-%Y}</b> <br/> Occupancy Count: <b>{point.y:.2f}</b>",
      },
      credits: {
        enabled: false,
      },
      series: series,
    };
  }

  public hourlyCountChart(xAxisUnits: any, categoryList: any[], series: any, callback: Function): any {
    return {
      chart: {
        type: "column",
        marginTop: 20,
        height: "280",
        backgroundColor: "#26293b",
      },
      title: {
        text: null,
      },
      subtitle: {
        text: null,
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        type: "datetime",
        tickPixelInterval: 20,
        units: [["hour", [1]]],
      },
      yAxis: {
        tickInterval: 1,
        allowDecimals: false,
        title: {
          text: "Occupancy Count",
          style: {
            color: "#b1b1b5;",
          },
        },
        labels: {
          style: {
            color: "#b1b1b5;",
          },
        },
        gridLineColor: "#2d3042",
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          turboThreshold: 10000,
          borderWidth: 0,
          borderColor: null,
          events: {
            click: callback,
          },
        },
      },
      tooltip: {
        headerFormat: "Status: <b>{series.name}</b><br/>",
        pointFormat: "Datetime: <b>{point.x:%m-%d-%Y %H:%M:%S}</b> <br/> Occupancy Count: <b>{point.y:.2f}</b>",
      },
      credits: {
        enabled: false,
      },
      series: series,
    };
  }

  public hourlyCountChart1(xAxisUnits: any, categoryList: any[], series: any, callback: Function): any {
    return {
      chart: {
        type: "column",
        marginTop: 20,
        height: "280",
        backgroundColor: "#26293b",
      },
      title: {
        text: null,
      },
      subtitle: {
        text: null,
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        type: "datetime",
        tickPixelInterval: 20,
        units: [["day", [1]]],
      },
      yAxis: {
        tickInterval: 1,
        allowDecimals: false,
        title: {
          text: "Occupancy Count",
          style: {
            color: "#b1b1b5;",
          },
        },
        labels: {
          style: {
            color: "#b1b1b5;",
          },
        },
        gridLineColor: "#2d3042",
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          turboThreshold: 10000,
          borderWidth: 0,
          borderColor: null,
          events: {
            click: callback,
          },
        },
      },
      tooltip: {
        headerFormat: "Status: <b>{series.name}</b><br/>",
        pointFormat:
          "Datetime: <b>{point.x:%m-%d-%Y}</b> <br/> Occupancy Count: <b>{point.y:.2f}</b>",
      },
      credits: {
        enabled: false,
      },
      series: series,
    };
  }

  public peoTeamPerformanceChart(categoryList: any[], series: any, callback: Function): any {
    return {
      chart: {
        type: "column",
        marginTop: 20,
        height: "280",
        backgroundColor: "#26293b",
      },
      title: {
        text: null,
      },
      subtitle: {
        text: null,
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        categories: categoryList,
      },
      yAxis: {
        tickInterval: 1,
        allowDecimals: false,
        title: {
          text: "Action count",
          style: {
            color: "#b1b1b5;",
          },
        },
        labels: {
          style: {
            color: "#b1b1b5;",
          },
        },
        gridLineColor: "#2d3042",
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        column: {
          //pointPadding: 0.4,
          borderWidth: 0,
          pointWidth: 50,
        },
        series: {
          events: {
            click: callback,
          },
        },
      },
      /* tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of hours<br/>'
      }, */
      credits: {
        enabled: false,
      },
      series: series,
    };
  }

  public actionNotTakenChart(categoryList: any[], series: any, callback: Function): any {
    return {
      chart: {
        type: "column",
        marginTop: 20,
        height: "280",
        backgroundColor: "#26293b",
      },
      title: {
        text: null,
      },
      subtitle: {
        text: null,
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        type: "datetime",
        tickPixelInterval: 20,
        units: [["day", [1]]],
      },
      yAxis: {
        tickInterval: 1,
        allowDecimals: false,
        title: {
          text: "Action Not Taken Count",
          style: {
            color: "#b1b1b5;",
          },
        },
        labels: {
          style: {
            color: "#b1b1b5;",
          },
        },
        gridLineColor: "#2d3042",
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        column: {
          //pointPadding: 0.4,
          borderWidth: 0,
          pointWidth: 50,
        },
        series: {
          turboThreshold: 10000,
          borderWidth: 0,
          borderColor: null,
          events: {
            click: callback,
          },
        },
      },
      tooltip: {
        headerFormat: "Status: <b>{series.name}</b><br/>",
        pointFormat: "Datetime: <b>{point.x:%m-%d-%Y}</b> <br/> Action Not Taken Count: <b>{point.y:.2f}</b>",
      },
      credits: {
        enabled: false,
      },
      series: series,
    };
  }

  public ticketIssuedChart(series: any, callback: Function): any {
    return {
      chart: {
        type: "column",
        marginTop: 20,
        height: "280",
        backgroundColor: "#26293b",
      },
      title: {
        text: null,
      },
      subtitle: {
        text: null,
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        type: "datetime",
        tickPixelInterval: 20,
        units: [["day", [1]]],
      },
      yAxis: {
        tickInterval: 1,
        allowDecimals: false,
        title: {
          text: "Ticket Count",
          style: {
            color: "#b1b1b5;",
          },
        },
        labels: {
          style: {
            color: "#b1b1b5;",
          },
        },
        gridLineColor: "#2d3042",
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        column: {
          //pointPadding: 0.4,
          borderWidth: 0,
          pointWidth: 20,
        },
        series: {
          turboThreshold: 10000,
          borderWidth: 0,
          borderColor: null,
          events: {
            click: callback,
          },
        },
      },
      tooltip: {
        headerFormat: "",
        pointFormat: "Datetime: <b>{point.x:%m-%d-%Y}</b> <br/> Total count: <b>{point.y:.2f}</b>",
      },
      credits: {
        enabled: false,
      },
      series: series,
    };
  }

  public systemHealthColumnChart(series: any,categoryList: any[], callback: Function): any {
    return {
      chart: {
        type: "column",
        marginTop: 20,
        height: "280",
        backgroundColor: "#26293b",
      },
      title: {
        text: null,
      },
      subtitle: {
        text: null,
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        categories: categoryList,
        gridLineWidth: 0,
        minorGridLineWidth: 0,
      },
      yAxis: {
        tickInterval: 1,
        allowDecimals: false,
        title: {
          text: "Counts",
          style: {
            color: "#b1b1b5;",
          },
        },
        labels: {
          style: {
            color: "#b1b1b5;",
          },
        },
        gridLineColor: "#2d3042",
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          borderColor: null,
          events: {
            click: callback,
          },
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b><br/>',
      },
      credits: {
        enabled: false,
      },
      labels: {
        
      },
      series: series,
    };
  }

  public systemHealthPieChart(series: any,categoryList: any[], callback: Function): any {
    return {
      chart: {
        type: "pie",
        marginTop: 20,
        height: "280",
        backgroundColor: "#26293b",
      },
      title: {
        text: null,
      },
      subtitle: {
        text: null,
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        categories: categoryList,
        gridLineWidth: 0,
        minorGridLineWidth: 0,
      },
      yAxis: {
        tickInterval: 1,
        allowDecimals: false,
        title: {
          text: "Counts",
          style: {
            color: "#b1b1b5;",
          },
        },
        labels: {
          style: {
            color: "#b1b1b5;",
          },
        },
        gridLineColor: "#2d3042",
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          borderColor: null,
          events: {
            click: callback,
          },
        },
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              distance: -50
          }
      }
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b><br/>',
      },
      credits: {
        enabled: false,
      },
      labels: {
        
      },
      series: series,
    };
  }

  public userReportBarChart(series : any , callback : Function) {
    return {
      credits: false,
      chart: {
        type: 'column',
        height: 300,
        backgroundColor: "#26293b"
      },
      title: {
        text: null
      },
      subtitle: {
        text: null
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        type: "datetime",
        tickPixelInterval: 20,
        units: [["day", [1]]],
        style: {
          color: "#b1b1b5;",
        }
      },
      yAxis: {
        tickInterval: 1,
        allowDecimals: false,
        title: {
          text: "Parking Counts",
          style: {
            color: "#b1b1b5;"
          },
        },
        labels: {
          style: {
            color: "#b1b1b5;",
          },
        },
        gridLineColor: "#2d3042",
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: false,
            format: '{point.y} Counts'
          },
          events: {
            click: callback,
          }
        }
      },

      tooltip: {
        headerFormat: "Status: <b>{series.name}</b><br/>",
        pointFormat:
          "Datetime: <b>{point.x:%m-%d-%Y}</b> <br/> Occupancy Count: <b>{point.y:.2f}</b>",
      },
      series : series,
    }
  }

  public userReportUtilizationChart(xAxisUnits: any, categoryList: any[], series : any, callback: Function): any {
    return {
      setOptions: {
        time: {
          timezone: 'America/New_York'
        },
        global: {
          useUTC: false
        }
      },
      chart: {
        type: "column",
        // marginTop: 20,
        height: "280",
        backgroundColor: "#26293b",
      },
      title: {
        text: null,
      },
      subtitle: {
        text: null,
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        type: "datetime",
        tickPixelInterval: 20,
        units: [["hour", [1]]],
      },
      yAxis: {
        tickInterval: 1,
        allowDecimals: false,
        title: {
          text: "Utilization %",
          style: {
            color: "#b1b1b5;",
          },
        },
        labels: {
          style: {
            color: "#b1b1b5;",
          },
        },
        gridLineColor: "#2d3042",
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          turboThreshold: 10000,
          borderWidth: 0,
          borderColor: null,
          events: {
            click: callback,
          },
        },
      },
      tooltip: {
         headerFormat: 'Status: <b>Parking</b><br>',
        pointFormat:  'Date/ Time: <b>{point.x:%m-%d-%Y %H:%M:%S}</b><br><span style="font-size:11px">{series.name}</span>: <b>{point.y:.2f}%</b>' },
      credits: {
        enabled: false,
      },
      series: series,
    };
  }

  public userReportUtilizationChart1(xAxisUnits: any, categoryList: any[], series : any, callback: Function): any {
    return {
      setOptions: {
        time: {
          timezone: 'America/New_York'
        },
        global: {
          useUTC: false
        }
      },
      chart: {
        type: "column",
        // marginTop: 20,
        height: "280",
        backgroundColor: "#26293b",
      },
      title: {
        text: null,
      },
      subtitle: {
        text: null,
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        type: "datetime",
        tickPixelInterval: 20,
        units: [["day", [1]]],
      },
      yAxis: {
        tickInterval: 1,
        allowDecimals: false,
        title: {
          text: "Utilization %",
          style: {
            color: "#b1b1b5;",
          },
        },
        labels: {
          style: {
            color: "#b1b1b5;",
          },
        },
        gridLineColor: "#2d3042",
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          turboThreshold: 10000,
          borderWidth: 0,
          borderColor: null,
          events: {
            click: callback,
          },
        },
      },
      tooltip: {
          headerFormat: 'Status: <b>Parking</b><br>',
          pointFormat:  'Date/ Time: <b>{point.x:%m-%d-%Y}</b><br><span style="font-size:11px">{series.name}</span>: <b>{point.y:.2f}%</b>'
        },
      credits: {
        enabled: false,
      },
      series: series,
    };
  }
}