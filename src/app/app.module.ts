import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScheduleModule, RecurrenceEditorModule , DayService ,WeekService,WorkWeekService,MonthService,MonthAgendaService,DragAndDropService,ResizeService} from '@syncfusion/ej2-angular-schedule';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScheduleModule, RecurrenceEditorModule, TreeViewModule, DropDownListModule, DateTimePickerModule 
  ],
  providers: [DayService,  WeekService, WorkWeekService, MonthService, MonthAgendaService,DragAndDropService,ResizeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
