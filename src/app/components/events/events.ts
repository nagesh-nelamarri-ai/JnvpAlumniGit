import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Eventscard } from '../eventscard/eventscard';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { EventData } from '../../models/eventsdata';
import { ImageModule } from 'primeng/image';
import { TooltipModule } from 'primeng/tooltip';
import { subtitle } from '@primeuix/themes/aura/card';
import { EventService } from '../../services/eventservice';
import { AppConfigService } from '../../services/AppConfigService';
import { EventsModel } from '../../models/eventmodel';

@Component({
  selector: 'app-events',
  imports: [CommonModule, ButtonModule, CardModule, ImageModule, DialogModule,
    TooltipModule],
  providers: [DialogService],
  templateUrl: './events.html',
  styleUrl: './events.css',
  standalone: true
})


export class Events implements OnInit {

  ref: DynamicDialogRef<any> | null = null;
  events: EventData[] = [];
  eventList: EventsModel[] = [];
  displayImageModal = false;
  googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdNgARXYxDZL9BiiJgXtB1Zs97xokFPqvQSZ76ncMwLo06Wrw/viewform';
  imageUrl = '';// 'assets/gallery/Alumni_Invitation.jpg' // Replace with dynamic source if needed
  private readonly apiUrl: string;

  constructor(public dialogService: DialogService, public eventService: EventService, private config: AppConfigService) {
    this.apiUrl = this.config.apiUrl;
  }


  ngOnInit(): void {
    this.events = [];
    // this.loadEvents();
    this.loadEventsData();
  }

  loadEventsData(){
    this.eventList = [
      {
        title: 'JNVP Alumni Meet 2025',
        eventDateTime: new Date('2025-12-06T10:00:00'),
        location: 'JNV Palair',
        filePath: 'assets/gallery/Alumni_Invitation.jpg',
        alt: 'JNVP',
      },
      {
        title: 'Health Camp',
        eventDateTime: new Date('2025-12-06T10:00:00'),
        location: 'Admission Block',
        filePath: 'assets/gallery/Event_HealthCamp.jpg',
        alt: 'JNVP',
      },
      {
        title: 'Career Guidance',
        eventDateTime: new Date('2025-12-06T18:00:00'),
        location: 'MP Hall',
        filePath: 'assets/gallery/Event_Career.jpg',
        alt: 'JNVP',
      },
      {
        title: 'Zumba',
        eventDateTime: new Date('2025-12-06T10:00:00'),
        location: 'Football Ground',
        filePath: 'assets/gallery/Event_Zumba.jpg',
        alt: 'JNVP',
      },
      {
        title: 'Campus Run',
        eventDateTime: new Date('2025-12-07T07:00:00'),
        location: 'Jnv Campus',
        filePath: 'assets/gallery/Event_CampusRun.jpg',
        alt: 'JNVP',
      },
      
      
    ]

  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe(data => {
      console.log('get all events ', data.length, data);
      if (data) {
        // this.events = data;
        this.events = data.map(e => ({
    ...e,
    eventDateTime: e.eventDateTime ? new Date(e.eventDateTime) : null // convert string → Date
  }));
      }
      console.log('map all events ',  this.events);

    });
  }

  addEventCard() {
    this.ref = this.dialogService.open(Eventscard, {
      header: 'Add Event',
      width: '35%',
      baseZIndex: 10000,
      modal: true,
      closable: true,
      draggable: false,
      resizable: false
    });
  }

  showImage(event: EventsModel) {
    this.imageUrl = event.filePath!;
    this.displayImageModal = true;
  }

  hideImage() {
    this.displayImageModal = false;
  }

  openGoogleForm() {
    window.open(this.googleFormUrl, '_blank');
  }

  getFullPath(filePath: string): string {
    return this.apiUrl + filePath;
  }

}
