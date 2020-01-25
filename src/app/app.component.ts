import { Component, ViewChild } from '@angular/core';
import { View, EventSettingsModel, DragEventArgs, ResizeEventArgs, CellClickEventArgs, ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { Key } from 'protractor';
import { DragAndDropEventArgs } from '@syncfusion/ej2-angular-navigations';
import {L10n} from '@syncfusion/ej2-base';


L10n.load({
  'en-US':{
    'schedule':{
      'saveButton':'Add',
      'cancelButton':'Cancel',
      'newEvent':'New Appointment',
    }
  }
});

@Component({
  selector: 'app-root',
  template: `<div>
  <div style="float:right;margin-right:80px;">
    <h2 >Appointments to be taken</h2>
    <div style="width:250px;float:right;">
      <ejs-treeview [fields]="field" allowDragAndDrop='true' (nodeDragStop)= "onTreeDragStop($event)" > 
      </ejs-treeview>
  </div>
  </div>

<div style="float:left">
  <ejs-schedule #scheduleObj height="630" width="850" [allowDragAndDrop]="true" [allowResizing]="true" (dragStart)="onDragStart($event)" (resizeStart)="onResizeStart($event)"  [selectedDate]="setDate" [eventSettings]="eventSettings" [currentView]="setView" >
    
    <ng-template #editorTemplate let-data>
      <table  class="custom-event-editor" width="100%" cellpadding="5">
        <tbody>
        <tr>
          <td class ="e-textlabel">Name of Patient </td>
          <td colspan ="4">
            <input id="Subject" class="e-field e-input" type="text" value="{{data.Subject}}" data-name="Subject"
            style="width:100%"/>
          </td>
        </tr>
         <tr>
          <td class ="e-textlabel">Disease </td>
          <td colspan ="4">
            <ejs-dropdownlist id='Disease' class="e-field" value='{{data.Disease}}' data-name="Disease" placeholder='Choose disease'
            [dataSource]='DiseaseData' [fields]='diseaseFields' ></ejs-dropdownlist>
          </td>
        </tr>
        <tr>
          <td class ="e-textlabel">Service </td>
          <td colspan ="4">
            <ejs-dropdownlist id='Status' class="e-field" value='{{data.Status}}' data-name="Status" placeholder='Choose service'
            [dataSource]='StatusData' [fields]='statusFields' ></ejs-dropdownlist>
          </td>
        </tr>
       
        <tr>
          <td class ="e-textlabel">From </td>
          <td colspan ="4">
            <ejs-datetimepicker id="StartTime" class="e-field" data-name="StartTime" format="M/dd/yy h:mm a"
            [value]="dateParser(data.startTime||data.StartTime)"></ejs-datetimepicker>
          </td>
        </tr>
         <tr>
          <td class ="e-textlabel">To </td>
          <td colspan ="4">
            <ejs-datetimepicker id="EndTime" class="e-field" data-name="EndTime" format="M/dd/yy h:mm a"
            [value]="dateParser(data.endTime||data.EndTime)"></ejs-datetimepicker>
          </td>
        </tr>
        <tr>
          <td class ="e-textlabel">Description </td>
          <td colspan ="4">
            <textarea id="Description" class="e-field e-input" data-name="Description" rows="3" cols="50" 
            value="{{data.Description}}" style="width:100%;height:60px !important; resize:vertical"  ></textarea>
          </td>
        </tr>
        </tbody>
       </table>
    </ng-template>  
  
  </ejs-schedule>
  </div></div>
 
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('scheduleObj')
  public scheduleInstance : ScheduleComponent;
  title = 'schedulerapp';
  public setView: View = 'WorkWeek';
  public setDate: Date = new Date(2019, 0, 13);
 
  public dateParser(data:string){
    return new Date(data);
  }
  public statusFields:Object={text:'StatusText',value:'StatusText'};
  public StatusData:Object[]=[
    {StatusText:'New'},
    {StatusText:'Requested'},
    {StatusText:'Confirmed'}
  ];
  public diseaseFields: Object = { text: 'DiseaseText', value: 'DiseaseText' };
  public DiseaseData: Object[] = [
    { DiseaseText: 'Fever' },
    { DiseaseText: 'Cold' },
    { DiseaseText: 'Headache' },
    { DiseaseText: 'Other' }
  ];

  onTreeDragStop(args: DragAndDropEventArgs): void {
    let cellData:CellClickEventArgs=this.scheduleInstance.getCellDetails(args.target);
    let eventData:{[key:string]:Object }={
      Subject:args.draggedNodeData.text,
      StartTime:cellData.startTime,
      EndTime:cellData.endTime,
      IsAllDay:cellData.isAllDay  
    };
    this.scheduleInstance.addEvent(eventData);
  }

  onDragStart(args: DragEventArgs):void {
    args.scroll.enable=false;
    args.scroll.scrollBy= 500;
    args.interval=1;
    args.navigation.enable=true;
  }

  onResizeStart(args: ResizeEventArgs): void {
    args.scroll.enable = false;
    args.scroll.scrollBy = 500;
    args.interval = 1;
  }

  public waitingList:{[Key:string]:Object}[]=[
    {
      Id:1,
      Name:'Steven'
    },
    {
      Id: 2,
      Name: 'Mira'
    },
    {
      Id: 3,
      Name: 'Lisa'
    }
  
  ];
  public field:Object ={dataSource:this.waitingList,id:'Id',text:'Name'};
  public data: object[] = [{
    Id: 1,
    Subject: 'Mentor meeting',
    StartTime: new Date(2019, 0, 14, 1, 0),
    EndTime: new Date(2019, 0, 14, 2, 0),
    IsAllDay: false,
    RecurrenceRule: 'FREQ=DAILY;INTERVAL=2;COUNT=8',
    RecurrenceException: '20180130T043000Z',
    Description: 'Meeting compulsory',

  }, {
    Id: 2,
    Subject: 'Scrum Meeting',
    StartTime: new Date(2019, 0, 15, 4, 0),
    EndTime: new Date(2019, 0, 15, 5, 0),
    Description: 'Meeting time changed based on team activities.',
    IsReadonly: true
  }, {
    Id: 3,
    Subject: 'Team Meeting',
    StartTime: new Date(2019, 0, 17, 5, 0),
    EndTime: new Date(2019, 0, 17, 6, 0),
    Description: 'Attendance mandatory',
    AllDay: true,
    IsBlock: true
  }, {
    Id: 4,
    Subject: '',
    StartTime: new Date(2019, 0, 17, 4, 0),
    EndTime: new Date(2019, 0, 19, 6, 0),
    Description: 'Active participation is required',
  }

  ];
  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
    fields: {
      id: 'Id',
      subject: { name: 'Subject', default: "Unnamed appointment", title: "Name of Patient" },
      isAllDay: { name: 'IsAllDay' },
      startTime: { name: 'StartTime' },
      endTime: { name: 'EndTime' }
    }
  };

}
