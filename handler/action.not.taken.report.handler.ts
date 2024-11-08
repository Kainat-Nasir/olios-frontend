import { Injectable } from '@angular/core';
import { HighChartConfiguration } from '../highchart/highchart.configuration';
import { ReportService } from '../services/report.service';
import { first } from 'rxjs/operators';

/**
 * @author MSA
 */

@Injectable()
export class ActionNotTakenReportHandler {
  constructor(public reportService: ReportService,
    public highChartConfiguration: HighChartConfiguration) {
  }

  getByActionNotTaken(reportSearchCriteria: any): void {
    this.reportService.getByActionNotTaken(reportSearchCriteria)
      .pipe(first())
      .subscribe(response => {
        //console.log("findByActionNotTaken.response={}", response);

        if (response.code === 0) {
          if (response.data && response.data > 0) {
          }
        }
      });
  }
}