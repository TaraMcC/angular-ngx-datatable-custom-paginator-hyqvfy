import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { DataTablePagerComponent } from './pager.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, NgxDatatableModule ],
  declarations: [ AppComponent, DataTablePagerComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
