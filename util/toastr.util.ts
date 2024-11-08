import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

/**
 * @author MSA
 */

@Injectable()
export class ToastrUtil {
    constructor(public toastrService: ToastrService) {
    }

    success(message?: string, title?: string): void {
        //alert(message);

        this.toastrService.success(message, "Success");

        /* this.toastrService.error('everything is broken', 'Major Error', {
            timeOut: 3000
        }); */
    }

    error(message?: string, title?: string): void {
        //alert(message);
        
        this.toastrService.error(message);
    }
}
