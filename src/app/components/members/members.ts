import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RegistraionService } from '../../services/registrationservice';

@Component({
  selector: 'app-members',
  imports: [CommonModule, CardModule],
  templateUrl: './members.html',
  styleUrl: './members.css',
  standalone: true
})
export class Members implements OnInit {

  associationMembers: MembersData[] = [];
  alumniMembers: MembersData[] = [];
  registeredMembers: MembersData[] = [];

  constructor(private registrationService: RegistraionService) { }
  ngOnInit(): void {
    this.loadMembersData();
    this.loadRegisteredMembers();
  }

  loadRegisteredMembers() {
    this.registrationService.getAll().subscribe(data =>{
      console.log('get all members',data);
      if(data){
        this.registeredMembers = data.map(member => ({
          name: member.fullName || '',
          designation: 'Member',
          image: 'https://localhost:7143/'+ member.filePath,
          year: member.yearFrom ? member.yearFrom.toString() : ''
        }));

        this.alumniMembers = data.filter(x => x.yearFrom == 2000).map(member => ({
          name: member.fullName || '',
          designation: 'Member',
          image: 'https://localhost:7143/'+ member.filePath,
          year: member.yearFrom ? member.yearFrom.toString() : '',
          toYear: member.yearTo ? member.yearTo.toString() : ''
        }));
      }
      console.log('registered members',this.registeredMembers);
    });
  }

  loadMembersData() {
    this.associationMembers = [
      { name: 'Papaiah Varla', designation: 'President', image: 'assets/gallery/Papaiah_1.jpg',year:'1988',toYear:'1995' },
      { name: 'Jane Smith', designation: 'Secretary', image: 'assets/gallery/Photo_2.jpg', year:'1995', toYear:'1999' },
      { name: 'Alice Brown', designation: 'Treasurer', image: 'assets/gallery/Photo_3.jpg',  year:'1992', toYear:'1996' }
    ];

    // this.alumniMembers = [
    //   { name: 'Nagesh Nelamarri', designation: 'Alumni', image: 'assets/gallery/Nagesh_Alumni.jpg' },
    //   { name: 'Emma Green', designation: 'Alumni', image: 'assets/gallery/Photo_2.jpg' },
    //   { name: 'Michael Black', designation: 'Alumni', image: 'assets/gallery/Photo_3.jpg' }
    // ];

    // this.registeredMembers = [
    //   { name: 'Nagesh Nelamarri', designation: 'Member', image: 'assets/gallery/Photo_6.jpg' },
    //   { name: 'James Gray', designation: 'Member', image: 'assets/gallery/Photo_2.jpg' },
    //   { name: 'Patricia Yellow', designation: 'Member', image: 'assets/gallery/Photo_3.jpg' }
    // ];
  }

}
