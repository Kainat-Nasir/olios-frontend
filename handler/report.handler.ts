import { Injectable } from '@angular/core';
import { HighChartConfiguration } from '../highchart/highchart.configuration';
import { ReportService } from '../services/report.service';
import { first } from 'rxjs/operators';

/**
 * @author MSA
 */

@Injectable()
export class ReportHandler {
  constructor(public reportService: ReportService,
    public highChartConfiguration: HighChartConfiguration) {
  }
}