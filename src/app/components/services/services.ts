import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { createTimeline, stagger } from 'animejs';

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ScrollAnimateDirective],
  template: `
    <section id="servicios" class="services section" role="region" aria-labelledby="services-title" appScrollAnimate scrollThreshold="0.15" (visible)="animateSection()">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Nuestros Servicios</span>
          <h2 id="services-title" class="section-title">
            Soluciones de cortinas para cada espacio
          </h2>
          <p class="section-subtitle">
            Ofrecemos una amplia variedad de estilos y materiales para satisfacer 
            las necesidades de cualquier ambiente.
          </p>
        </div>
        
        <div class="services-grid">
          @for (service of services; track service.id) {
            <article class="service-card">
              <div class="card-image">
                <img 
                  [src]="service.image" 
                  [alt]="'Cortinas ' + service.title"
                  loading="lazy"
                />
                <div class="image-overlay"></div>
              </div>
              <div class="card-body">
                <h3 class="card-title">{{ service.title }}</h3>
                <p class="card-description">{{ service.description }}</p>
                <ul class="card-features">
                  @for (feature of service.features; track feature) {
                    <li>
                      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                      {{ feature }}
                    </li>
                  }
                </ul>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .services {
      background: var(--color-white);
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
      margin-bottom: 1rem;
      text-wrap: balance;
      opacity: 0;
    }
    
    .section-subtitle {
      font-size: 1.0625rem;
      color: var(--color-gray-dark);
      line-height: 1.7;
      opacity: 0;
    }
    
    .services-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }
    
    .service-card {
      background: var(--color-white);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--color-gray-medium);
      transition: all var(--transition-normal);
      opacity: 0;
    }
    
    .service-card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-xl);
      border-color: transparent;
    }
    
    .card-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }
    
    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-slow);
    }
    
    .service-card:hover .card-image img {
      transform: scale(1.08);
    }
    
    .image-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(17, 17, 17, 0.3) 0%, transparent 50%);
      opacity: 0;
      transition: opacity var(--transition-normal);
    }
    
    .service-card:hover .image-overlay {
      opacity: 1;
    }
    
    .card-body {
      padding: 1.5rem;
    }
    
    .card-title {
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-black);
      margin-bottom: 0.75rem;
    }
    
    .card-description {
      font-size: 0.9375rem;
      color: var(--color-gray-dark);
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    
    .card-features {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .card-features li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--color-gray-dark);
    }
    
    .card-features svg {
      width: 16px;
      height: 16px;
      color: var(--color-accent);
      flex-shrink: 0;
    }
    
    @media (max-width: 1024px) {
      .services-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 640px) {
      .services-grid {
        grid-template-columns: 1fr;
      }
      
      .card-image {
        height: 180px;
      }
    }
  `]
})
export class ServicesComponent {

  services: Service[] = [
    {
      id: 'blackout',
      title: 'Cortinas Blackout',
      description: 'Bloqueo total de luz para un descanso perfecto y privacidad absoluta.',
      image: '/images/service-blackout.jpg',
      features: ['100% oscuridad', 'Aislante termico', 'Facil mantenimiento']
    },
    {
      id: 'sheer',
      title: 'Cortinas Sheer',
      description: 'Elegancia y suavidad que permite el paso de luz natural filtrada.',
      image: '/images/service-sheer.jpg',
      features: ['Luz natural', 'Privacidad parcial', 'Ambiente acogedor']
    },
    {
      id: 'roller',
      title: 'Cortinas Enrollables',
      description: 'Diseno moderno y funcional ideal para espacios contemporaneos.',
      image: '/images/service-roller.jpg',
      features: ['Estilo minimalista', 'Ahorro de espacio', 'Varios colores']
    },
    {
      id: 'panel',
      title: 'Panel Japones',
      description: 'Sofisticacion oriental perfecta para grandes ventanales y divisiones.',
      image: '/images/service-panel.jpg',
      features: ['Grandes ventanales', 'Division de espacios', 'Diseno elegante']
    }
  ];

  animateSection(): void {
    const timeline = createTimeline({
      defaults: {
        ease: 'easeOutCubic'
      }
    });

    timeline
      .add('.services .section-label', {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600
      })
      .add('.services .section-title', {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 700
      }, '-=400')
      .add('.services .section-subtitle', {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600
      }, '-=400')
      .add('.service-card', {
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 700,
        delay: stagger(100)
      }, '-=300');
  }
}
