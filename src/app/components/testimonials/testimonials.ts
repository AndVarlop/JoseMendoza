import { Component, DestroyRef, inject, afterNextRender, signal } from '@angular/core';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { createTimeline } from 'animejs';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [ScrollAnimateDirective],
  template: `
    <section id="testimonios" class="testimonials section" role="region" aria-labelledby="testimonials-title" appScrollAnimate scrollThreshold="0.2" (visible)="animateSection()">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Testimonios</span>
          <h2 id="testimonials-title" class="section-title">
            Lo que dicen nuestros clientes
          </h2>
        </div>
        
        <div class="testimonials-carousel">
          <div class="carousel-track" [style.transform]="'translateX(-' + currentSlide() * 100 + '%)'" aria-live="polite">
            @for (testimonial of testimonials; track testimonial.id) {
              <div class="testimonial-card">
                <div class="stars" aria-label="Calificacion: {{ testimonial.rating }} de 5 estrellas">
                  @for (star of [1,2,3,4,5]; track star) {
                    <svg 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                      [class.filled]="star <= testimonial.rating"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  }
                </div>
                <blockquote class="testimonial-text">
                  "{{ testimonial.text }}"
                </blockquote>
                <div class="testimonial-author">
                  <div class="author-avatar">
                    {{ testimonial.name.charAt(0) }}
                  </div>
                  <div class="author-info">
                    <cite class="author-name">{{ testimonial.name }}</cite>
                    <span class="author-location">{{ testimonial.location }}</span>
                  </div>
                </div>
              </div>
            }
          </div>
          
          <div class="carousel-controls">
            <button 
              class="carousel-btn prev"
              (click)="prevSlide()"
              [disabled]="currentSlide() === 0"
              aria-label="Testimonio anterior"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <div class="carousel-dots">
              @for (dot of testimonials; track dot.id; let i = $index) {
                <button 
                  class="dot"
                  [class.active]="i === currentSlide()"
                  (click)="goToSlide(i)"
                  [attr.aria-label]="'Ir al testimonio ' + (i + 1)"
                ></button>
              }
            </div>
            <button 
              class="carousel-btn next"
              (click)="nextSlide()"
              [disabled]="currentSlide() === testimonials.length - 1"
              aria-label="Siguiente testimonio"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonials {
      background: var(--color-gray-light);
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    
    .section-header {
      text-align: center;
      max-width: 640px;
      margin: 0 auto 4rem;
    }
    
    .section-label {
      display: inline-block;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--color-accent);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 1rem;
      opacity: 0;
    }
    
    .section-title {
      font-family: var(--font-display);
      font-size: clamp(2rem, 4vw, 2.75rem);
      font-weight: 600;
      color: var(--color-black);
      line-height: 1.2;
      text-wrap: balance;
      opacity: 0;
    }
    
    .testimonials-carousel {
      max-width: 700px;
      margin: 0 auto;
      overflow: hidden;
      opacity: 0;
    }
    
    .carousel-track {
      display: flex;
      transition: transform 0.5s ease;
    }
    
    .testimonial-card {
      flex: 0 0 100%;
      background: var(--color-white);
      border-radius: var(--radius-lg);
      padding: 2.5rem;
      text-align: center;
      box-shadow: var(--shadow-md);
    }
    
    .stars {
      display: flex;
      justify-content: center;
      gap: 0.25rem;
      margin-bottom: 1.5rem;
    }
    
    .stars svg {
      width: 20px;
      height: 20px;
      color: var(--color-gray-medium);
    }
    
    .stars svg.filled {
      color: #F59E0B;
    }
    
    .testimonial-text {
      font-size: 1.125rem;
      color: var(--color-gray-dark);
      line-height: 1.8;
      margin-bottom: 2rem;
      font-style: italic;
    }
    
    .testimonial-author {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }
    
    .author-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--color-accent);
      color: var(--color-white);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      font-weight: 600;
    }
    
    .author-info {
      text-align: left;
    }
    
    .author-name {
      display: block;
      font-size: 1rem;
      font-weight: 600;
      color: var(--color-black);
      font-style: normal;
    }
    
    .author-location {
      font-size: 0.875rem;
      color: var(--color-gray-dark);
    }
    
    .carousel-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 2rem;
    }
    
    .carousel-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--color-white);
      border: 1px solid var(--color-gray-medium);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition-fast);
    }
    
    .carousel-btn:hover:not(:disabled) {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: var(--color-white);
    }
    
    .carousel-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    
    .carousel-btn svg {
      width: 20px;
      height: 20px;
    }
    
    .carousel-dots {
      display: flex;
      gap: 0.5rem;
    }
    
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--color-gray-medium);
      transition: all var(--transition-fast);
    }
    
    .dot.active {
      background: var(--color-accent);
      transform: scale(1.2);
    }
    
    .dot:hover:not(.active) {
      background: var(--color-gray-dark);
    }
    
    @media (max-width: 640px) {
      .testimonial-card {
        padding: 1.75rem;
      }
      
      .testimonial-text {
        font-size: 1rem;
      }
    }
  `]
})
export class TestimonialsComponent {
  private destroyRef = inject(DestroyRef);
  private autoplayInterval: ReturnType<typeof setInterval> | null = null;

  currentSlide = signal(0);

  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Maria Rodriguez',
      location: 'Cartagena, Bocagrande',
      text: 'Jose transformo completamente mi sala. Las cortinas blackout son perfectas y la instalacion fue impecable. Muy profesional y puntual.',
      rating: 5
    },
    {
      id: 2,
      name: 'Carlos Mejia',
      location: 'Cartagena, El Prado',
      text: 'Excelente trabajo en mi oficina. El panel japones quedo espectacular y le da un toque muy moderno al espacio. Totalmente recomendado.',
      rating: 5
    },
    {
      id: 3,
      name: 'Ana Sofia Herrera',
      location: 'Cartagena, Manga',
      text: 'La asesoria de Jose fue clave para elegir las cortinas perfectas para mi apartamento. Servicio de primera y precios justos.',
      rating: 5
    },
    {
      id: 4,
      name: 'Roberto Castillo',
      location: 'Cartagena, Castillogrande',
      text: 'Ya es la segunda vez que trabajo con Jose. Siempre cumple con los tiempos y la calidad es excelente. Lo recomiendo totalmente.',
      rating: 5
    }
  ];

  constructor() {
    afterNextRender(() => {
      this.startAutoplay();
    });
    this.destroyRef.onDestroy(() => {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
      }
    });
  }

  animateSection(): void {
    const timeline = createTimeline({
      defaults: {
        ease: 'easeOutCubic'
      }
    });

    timeline
      .add('.testimonials .section-label', {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600
      })
      .add('.testimonials .section-title', {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 700
      }, '-=400')
      .add('.testimonials-carousel', {
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 800
      }, '-=400');
  }

  private startAutoplay(): void {
    this.autoplayInterval = setInterval(() => {
      if (this.currentSlide() < this.testimonials.length - 1) {
        this.currentSlide.update(v => v + 1);
      } else {
        this.currentSlide.set(0);
      }
    }, 5000);
  }

  private resetAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
    this.startAutoplay();
  }

  nextSlide(): void {
    if (this.currentSlide() < this.testimonials.length - 1) {
      this.currentSlide.update(v => v + 1);
    }
    this.resetAutoplay();
  }

  prevSlide(): void {
    if (this.currentSlide() > 0) {
      this.currentSlide.update(v => v - 1);
    }
    this.resetAutoplay();
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
    this.resetAutoplay();
  }
}
