import { Component, ViewChild } from "@angular/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @ViewChild(DatatableComponent) public table: DatatableComponent;
  public rows = [];
  public currentPageLimit: number = 10;
  public currentVisible: number = 3;
  public column = [{ name: "Name" }, { name: "Gender" }, { name: "Company" }];
  public readonly pageLimitOptions = [
    { value: 5 },
    { value: 10 },
    { value: 25 },
    { value: 50 },
    { value: 100 }
  ];
  public readonly visibleOptions = [
    { value: 1 },
    { value: 3 },
    { value: 5 },
    { value: 10 }
  ];

  constructor() {
    this.fetch(data => {
      this.rows = data;
    });
  }

  _addcolumn() {
    this.column = [...this.column, { name: "Wish" }];
    console.log(this.column);
  }

  // TODO[Dmitry Teplov] wrap dynamic limit in a separate component.
  public onLimitChange(limit: any): void {
    this.changePageLimit(limit);
    this.table.limit = this.currentPageLimit;
    this.table.recalculate();
    setTimeout(() => {
      if (this.table.bodyComponent.temp.length <= 0) {
        // TODO[Dmitry Teplov] find a better way.
        // TODO[Dmitry Teplov] test with server-side paging.
        this.table.offset = Math.floor(
          (this.table.rowCount - 1) / this.table.limit
        );
        // this.table.offset = 0;
      }
    });
  }

  private changePageLimit(limit: any): void {
    this.currentPageLimit = parseInt(limit, 10);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open(
      "GET",
      `https://unpkg.com/@swimlane/ngx-datatable@7.3.0/assets/data/company.json`
    );

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }
}
