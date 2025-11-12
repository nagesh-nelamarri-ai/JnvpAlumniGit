import { Component, OnInit } from '@angular/core';
import { ImageItem } from '../../models/imageitem';
import { Photoservice } from '../../services/photoservice';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-homecontent',
  imports: [CommonModule, GalleriaModule, CardModule],
  providers: [Photoservice],
  templateUrl: './homecontent.html',
  styleUrl: './homecontent.css',
  standalone: true
})
export class Homecontent implements OnInit {
  images: ImageItem[] = [];
  members: any[] = []; // Will be populated with member data

  responsiveOptions: any[] = [
    {
      breakpoint: '1300px',
      numVisible: 4
    },
    {
      breakpoint: '575px',
      numVisible: 1
    }
  ];
  constructor(private photoService: Photoservice) { }

  ngOnInit() {
    // this.images = [];

    // this.photoService.getImages().then((images) => {
    //   this.images = images;
    //   console.log('images', this.images)
    // });

    this.images = [
      {
                itemImageSrc: 'assets/gallery/Photo_1.jpg',
                thumbnailImageSrc: 'assets/gallery/Photo_2.jpg',
                alt: 'Image 1',
                title: 'Gallery Image 1'
            },
            {
                itemImageSrc: 'assets/gallery/Photo_2.jpg',
                thumbnailImageSrc: 'assets/gallery/Photo_2.jpg',
                alt: 'Image 2',
                title: 'Gallery Image 2'
            },
             {
                itemImageSrc: 'assets/gallery/Photo_3.jpg',
                thumbnailImageSrc: 'assets/gallery/Photo_3.jpg',
                alt: 'Image 3',
                title: 'Gallery Image 3'
            },
            {
                itemImageSrc: 'assets/gallery/Photo_2.jpg',
                thumbnailImageSrc: 'assets/gallery/Photo_2.jpg',
                alt: 'Image 2',
                title: 'Gallery Image 2'
            },
             {
                itemImageSrc: 'assets/gallery/Photo_3.jpg',
                thumbnailImageSrc: 'assets/gallery/Photo_3.jpg',
                alt: 'Image 3',
                title: 'Gallery Image 3'
            }
    ];

    this.members = [
    {
      name: 'Papaiah Varla',
      photo: 'assets/gallery/Papaiah_1.jpg',
      description: 'President, Alumni Association'
    },
    {
      name: 'Millennium Batch (2000 - 2007)',
      photo: 'assets/logo/Alumni_25_Logo.jpg',
      description: 'Alumni 2025 Host'
    }
  ];

  }
}
