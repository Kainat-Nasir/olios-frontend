import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TokenStorage } from "./util/token.storage";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "OliosAngular";
  resetToken: any;

  constructor(public router: Router,
    public activatedRoute: ActivatedRoute,
    public tokenStorage: TokenStorage) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((querParams) => {
      this.resetToken = querParams["params"].resettoken;
    });
  }
}
