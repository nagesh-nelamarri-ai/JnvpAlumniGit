import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { EventData } from '../../models/eventsdata';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { EventService } from '../../services/eventservice';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Toast } from "primeng/toast";

@Component({
  selector: 'app-eventscard',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    DatePickerModule,
    FileUploadModule,
    Toast
],
  templateUrl: './eventscard.html',
  styleUrl: './eventscard.css',
  standalone: true,
  providers: [MessageService]
})

export class Eventscard {
  events: EventData[] = [];
  newEvent: EventData = {
    title: '',
    file: null,
    description: '',
    eventDateTime: null,
    location: ''
  };

  showForm = false;

  constructor(private eventservice: EventService, private messageService: MessageService,public ref?: DynamicDialogRef) { }

  uploadFile(event: any) {
    const file: File = event.files[0];

    if (!file) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please select a file' });
      return;
    }else if(!this.newEvent.eventDateTime){
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please add event datatime' });
    }else if(!this.newEvent.location){
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please add event location' });
    }else if(!this.newEvent.description){
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please add event description' });
    }

    const formData = new FormData();
    // formData.append('Id', '');
    formData.append('File', file);
    formData.append('Title', this.newEvent.title);
    formData.append('Description', this.newEvent.description || '');
    formData.append('EventDateTime', this.newEvent.eventDateTime ? new Date(this.newEvent.eventDateTime).toISOString() : '');
    formData.append('Location', this.newEvent.location || '');

    console.log('Uploading file with data:', formData);

    this.eventservice.createEvent(formData).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File uploaded successfully!' });
      this.ref?.close();
    });

  }

  onUpload(event: any) {
    console.log('Upload event:', event);
  }

}
