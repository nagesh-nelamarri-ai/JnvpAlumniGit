import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { GoogleDriveService } from '../../services/google-drive-service';

@Component({
  selector: 'app-gallery',
  imports: [
    ButtonModule,
    CardModule,
    DialogModule,
    TooltipModule, CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
  standalone: true
})
export class Gallery implements OnInit {


  PHOTOS_FOLDER_ID = 'YOUR_PHOTOS_FOLDER_ID';
  VIDEOS_FOLDER_ID = 'YOUR_VIDEOS_FOLDER_ID';

  photos: any[] = [];
  videos: any[] = [];

  activeTab: 'photos' | 'videos' = 'photos';

  constructor(private gdrive: GoogleDriveService) { }

  ngOnInit() {
    this.loadPhotos();
    // this.loadVideos();
  }

  loadPhotos() {
    this.PHOTOS_FOLDER_ID = '1T5ITTT9xsJGe7RIl-qGbVdja-ISAkn8l';
    this.gdrive.getFilesFromFolder(this.PHOTOS_FOLDER_ID).subscribe(res => {
      this.photos = res.files;
    });
  }

  loadVideos() {
    this.gdrive.getFilesFromFolder(this.VIDEOS_FOLDER_ID).subscribe(res => {
      this.videos = res.files;
    });
  }

  getPublicFileUrl(fileId: string) {
    return `https://lh3.googleusercontent.com/d/${fileId}=s400`;
  }

  getDriveViewUrl(fileId: string) {
    return `https://drive.google.com/file/d/${fileId}/view`;
  }

  //  getPublicFileUrl(fileId: string): string {
  //   return `https://drive.google.com/uc?id=${fileId}`;
  // }

  getVideoEmbed(fileId: string): string {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }


}

