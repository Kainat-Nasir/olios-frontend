import { Injectable } from '@angular/core';

/**
 * @author MSA
 */

@Injectable()
export class HighChartDataTableUtil {
  constructor() {
  }

  update(e: any): void {
    alert('updateInSessionDataTable.Category: ' + e);
  }
}