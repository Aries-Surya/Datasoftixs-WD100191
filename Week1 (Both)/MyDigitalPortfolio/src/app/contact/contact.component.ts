import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;

  @ViewChild('contactFormElement') contactFormElement!: ElementRef;

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  sendEmail() {
    const serviceID = 'service_ww0i6kp';  // Your EmailJS service ID
    const templateID = 'template_07jf2fc';  // Your EmailJS template ID
    const publicKey = 'qXq2Ub0sv4cZP0dsa';  // Replace with your actual EmailJS Public Key

    const templateParams = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      subject: this.contactForm.value.subject,
      message: this.contactForm.value.message
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Message Sent!');
        this.contactForm.reset();
      }, (error) => {
        console.log('FAILED...', error);
        alert('Message Failed to Send!');
      });
  }
}
