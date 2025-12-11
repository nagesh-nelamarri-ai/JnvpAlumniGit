import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GoogleDriveService {

  apiKey = 'AIzaSyDkingmUoYbP6aS34PP7dbaI61f5lM3fl0';

  constructor(private http: HttpClient) {}

  getFilesFromFolder(folderId: string) {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents`
    + `&key=${this.apiKey}` 
    + `&fields=files(id,name,mimeType,thumbnailLink)`;
    return this.http.get<any>(url);
  }

  getPublicFileUrl(fileId: string) {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }

  getVideoEmbed(fileId: string) {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
}
