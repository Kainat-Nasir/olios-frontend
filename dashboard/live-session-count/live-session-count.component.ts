import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-session-count',
  templateUrl: './live-session-count.component.html',
  styleUrls: ['./live-session-count.component.scss']
})
export class LiveSessionCountComponent implements OnInit {

  @Input() heading = '';
  @Input() count = 0;
  @Input() iconClass = '';
  @Input() isImage = false;

  constructor() { }

  ngOnInit() {
  }

}
