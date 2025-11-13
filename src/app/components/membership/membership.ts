import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-membership',
  imports: [CardModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    FormsModule, FieldsetModule],
  templateUrl: './membership.html',
  styleUrl: './membership.css',
  standalone: true,
  providers: [MessageService]
})

export class Membership {

  qrCodeUrl = 'assets/gallery/QR-Code.jpg';
  showDialog = false;
  showFormDialog = false;

  bankDetails = {
    name: "Navodayan's The Alumni Association of JNV Khammam",
    accountNumber: '44130515561',
    ifsc: 'SBIN0020496',
    bank: 'State Bank of India, Gruhakalpa Branch, Hyderabad'
  };

  upiId = 'jnvkhammam@upi';

  registration = {
    name: '',
    batch: '',
    email: '',
    phone: '',
    membershipType: ''
  };
  constructor(private messageService: MessageService) { }

  showQrDialog() {
    this.showDialog = true;
  }

  DownloadFile(val: number) {
    let filename = '';
    filename = val == 1 ? 'Registration_certificate.pdf' : 'BYE-LAWS OF ALUMNI.pdf' ;
    const a = document.createElement('a'); 
     a.href = 'assets/gallery/' + filename;
    a.download = filename;
    a.click();
  }

}
