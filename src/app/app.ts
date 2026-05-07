import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { AboutComponent } from './components/about/about';
import { ServicesComponent } from './components/services/services';
import { GalleryComponent } from './components/gallery/gallery';
import { BenefitsComponent } from './components/benefits/benefits';
import { TestimonialsComponent } from './components/testimonials/testimonials';
import { CtaComponent } from './components/cta/cta';
import { FooterComponent } from './components/footer/footer';
import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    GalleryComponent,
    BenefitsComponent,
    TestimonialsComponent,
    CtaComponent,
    FooterComponent,
    WhatsappButtonComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
