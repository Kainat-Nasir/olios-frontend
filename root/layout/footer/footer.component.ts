import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WebConstants } from 'src/app/util/web.constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() {}
  
  public year: any = new Date().getFullYear();

  ngOnInit() {
  }

}