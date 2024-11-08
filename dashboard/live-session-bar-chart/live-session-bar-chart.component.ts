import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import * as Chart from "chart.js";

@Component({
  selector: "app-live-session-bar-chart",
  templateUrl: "./live-session-bar-chart.component.html",
  styleUrls: ["./live-session-bar-chart.component.scss"],
})
export class LiveSessionBarChartComponent implements OnInit {
  @ViewChild("liveSectionBarChart", { static: false })
  liveSectionBarChartRef!: ElementRef;

  constructor() {}

  ngOnInit() {}
}
