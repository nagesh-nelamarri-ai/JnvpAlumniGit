import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { RegistraionService } from '../../services/registrationservice';
import { Member} from '../../models/member';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-registraion',
  imports: [ CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    FileUploadModule,
    ButtonModule,
    ToastModule,
    InputNumberModule 
  ],
  providers: [MessageService],
  templateUrl: './registraion.html',
  styleUrl: './registraion.css',
  standalone: true
})
export class Registraion implements OnInit {
   public form: FormGroup = new FormGroup({}) ;
  constructor(public fb: FormBuilder,private registrationService: RegistraionService,private messageService: MessageService,public ref?: DynamicDialogRef) {}

  ngOnInit() {
  this.form = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    email: ['', [Validators.required, Validators.email]],
    yearFrom: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    yearTo: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    batch: [''],
    profession: ['', Validators.required],
    profilePhoto:[null, Validators.required],
    comments: [''],
    location: ['', Validators.required],
    filePath: [''],
    fileName: [''],
  });

  }

  onSubmit() {
    if (this.form.invalid) {
      //this.form.markAllAsTouched(); // highlight all invalid fields
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all fields' });
      return;
    }
    console.log('Form Values:', this.form.value);
    if (this.form.valid) {
      const memberData: Member = {
        ...this.form.value,
        fullName: `${this.form.value.name} ${this.form.value.surname}`,
        isActive: true,
        batch: this.form.value.batch ? this.form.value.batch : 0,
        roleId: 3 // Default role ID for new members
      };

      console.log('Member Data:', memberData);
      this.registrationService.register(memberData).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registered successfully' });
          setTimeout(() => {
            this.ref?.close();
          }, 200);
        },
        error: err => console.error('Error:', err)
      });
    } else {
      // this.form.markAllAsTouched();
    }
  }


  onFileSelect(event: any) {
    const file = event.files[0];
    const allowedTypes = ['image/jpeg', 'image/jpg', 'application/pdf','image/png'];
    if (file && allowedTypes.includes(file.type)) {
      this.form.patchValue({ profilePhoto: file });
      this.form.get('profilePhoto')?.markAsTouched();
      this.form.get('profilePhoto')?.updateValueAndValidity();
    } else {
      this.form.patchValue({ profilePhoto: null });
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid file type. Only JPEG, JPG,PNG and PDF are allowed.' });
    }
   
  }

  onFileRemove(event: any) {
    // Clear the form control when file is removed from FileUpload
    this.form.patchValue({ profilePhoto: null });
    this.form.get('profilePhoto')?.markAsTouched();
    this.form.get('profilePhoto')?.updateValueAndValidity();
  }

  getRegistrations() {
  this.registrationService.getAll().subscribe(data => {
    // this.registrations = data;
  });
  }

}
