import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RegistraionService } from '../../services/registrationservice';
import { AppConfigService } from '../../services/AppConfigService';
import { Member } from '../../models/member';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-members',
  imports: [CommonModule, CardModule, ProgressSpinnerModule, AutoCompleteModule, FormsModule, BadgeModule ],
  templateUrl: './members.html',
  styleUrl: './members.css',
  standalone: true
})
export class Members implements OnInit {

  associationMembers: MembersData[] = [];
  alumniMembers: MembersData[] = [];
  registeredMembers: MembersData[] = [];
  allMembers: Member[] = [];
  private readonly apiUrl: string;
  isLoading: boolean = false;
  yearList: string[] = [];
  year: string = '';
  filteredYears: string[] = [];

  constructor(private registrationService: RegistraionService, private config: AppConfigService) {
    this.apiUrl = this.config.apiUrl;
  }

  ngOnInit(): void {
    this.loadMembersData();
    // this.loadRegisteredMembers();
  }

  loadRegisteredMembers() {
    this.isLoading = true;

    this.registrationService.getAll().subscribe(data => {
      console.log('get all members ', data.length);
      this.isLoading = false;
      if (data) {
        this.allMembers = data;
        this.yearList = Array.from(new Set(data.map(x => x.yearFrom?.toString() || '').filter(x => x !== ''))).sort();
        console.log('year list ', this.yearList);

        this.registeredMembers = data.filter(x => x.roleId != 2).map(member => ({
          name: member.fullName || '',
          designation: 'Member',
          image: this.apiUrl + member.filePath,
          year: member.yearFrom ? member.yearFrom.toString() : '',
          toYear: member.yearTo ? member.yearTo.toString() : ''
        }));

        this.alumniMembers = data.filter(x => x.yearFrom == 2000 || x.yearTo == 2007).map(member => ({
          name: member.fullName || '',
          designation: 'Member',
          image: this.apiUrl + member.filePath,
          year: member.yearFrom ? member.yearFrom.toString() : '',
          toYear: member.yearTo ? member.yearTo.toString() : ''
        }));
      }
    });
  }

  loadMembersData() {
    this.associationMembers = [
      { name: 'Papaiah Varla', designation: 'President', image: 'assets/gallery/Papaiah.jpg', year: '1988', toYear: '1995' }
    ];

  }

  search(event: any) {
    const query = event.query.toLowerCase();
  this.filteredYears = this.yearList.filter(year =>
    year.toLowerCase().includes(query)
  );
   console.log('search year', event.query);
  }

  filterMembers() {
    if (this.year) {
      this.registeredMembers = this.allMembers.filter(x => x.roleId != 2).map(member => ({
          name: member.fullName || '',
          designation: 'Member',
          image: this.apiUrl + member.filePath,
          year: member.yearFrom ? member.yearFrom.toString() : '',
          toYear: member.yearTo ? member.yearTo.toString() : ''
        })).filter(x => x.year == this.year);
    } else {
      this.registeredMembers = this.allMembers.filter(x => x.roleId != 2).map(member => ({
          name: member.fullName || '',
          designation: 'Member',
          image: this.apiUrl + member.filePath,
          year: member.yearFrom ? member.yearFrom.toString() : '',
          toYear: member.yearTo ? member.yearTo.toString() : ''
        }));
    } 
  }

}
