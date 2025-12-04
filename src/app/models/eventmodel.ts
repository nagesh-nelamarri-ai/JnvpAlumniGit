export interface EventsModel {
  title: string;
  eventDateTime: Date | null;
  location: string;
  filePath?: string; 
  alt?: string; 
}