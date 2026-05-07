import { Component, ElementRef, inject, afterNextRender, PLATFORM_ID, viewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { createTimeline, stagger } from 'animejs';

interface Benefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-benefits',
  standalone: true,
  template: `
    <section id="beneficios" class="benefits section" role="region" aria-labelledby="benefits-title" #benefitsSection>
      <div class="container">
        <div class="section-header">
          <span class="section-label">Por que elegirnos</span>
          <h2 id="benefits-title" class="section-title">
            Beneficios de trabajar conmigo
          </h2>
        </div>
        
        <div class="benefits-grid">
          @for (benefit of benefits; track benefit.id) {
            <div class="benefit-card">
              <div class="benefit-icon" [innerHTML]="benefit.icon"></div>
              <h3 class="benefit-title">{{ benefit.title }}</h3>
              <p class="benefit-description">{{ benefit.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .benefits {
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
      text-wrap: balance;
      opacity: 0;
    }
    
    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
    }
    
    .benefit-card {
      text-align: center;
      padding: 2rem 1.5rem;
      border-radius: var(--radius-lg);
      background: var(--color-gray-light);
      transition: all var(--transition-normal);
      opacity: 0;
    }
    
    .benefit-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
      background: var(--color-white);
    }
    
    .benefit-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-white);
      border-radius: var(--radius-md);
      color: var(--color-accent);
      transition: all var(--transition-normal);
    }
    
    .benefit-card:hover .benefit-icon {
      background: var(--color-accent);
      color: var(--color-white);
      transform: scale(1.1);
    }
    
    .benefit-icon :global(svg) {
      width: 32px;
      height: 32px;
    }
    
    .benefit-title {
      font-family: var(--font-display);
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--color-black);
      margin-bottom: 0.75rem;
    }
    
    .benefit-description {
      font-size: 0.9375rem;
      color: var(--color-gray-dark);
      line-height: 1.6;
    }
    
    @media (max-width: 1024px) {
      .benefits-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 640px) {
      .benefits-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class BenefitsComponent {
  private platformId = inject(PLATFORM_ID);
  benefitsSection = viewChild<ElementRef>('benefitsSection');
  private hasAnimated = false;

  benefits: Benefit[] = [
    {
      id: 'installation',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>`,
      title: 'Instalacion Profesional',
      description: 'Montaje experto con herramientas especializadas y acabados perfectos.'
    },
    {
      id: 'advice',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>`,
      title: 'Asesoria Personalizada',
      description: 'Te guio en cada paso para encontrar la solucion perfecta para tu espacio.'
    },
    {
      id: 'quality',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>`,
      title: 'Materiales de Alta Calidad',
      description: 'Solo trabajo con las mejores telas y mecanismos del mercado.'
    },
    {
      id: 'warranty',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>`,
      title: 'Garantia de Satisfaccion',
      description: 'Tu satisfaccion es mi prioridad. Garantizo cada instalacion.'
    }
  ];

  constructor() {
    afterNextRender(() => {
      this.setupScrollAnimation();
    });
  }

  private setupScrollAnimation(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.hasAnimated = true;
            this.animateSection();
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = this.benefitsSection();
    if (section) {
      observer.observe(section.nativeElement);
    }
  }

  private animateSection(): void {
    const timeline = createTimeline({
      defaults: {
        ease: 'easeOutCubic'
      }
    });

    timeline
      .add('.benefits .section-label', {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600
      })
      .add('.benefits .section-title', {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 700
      }, '-=400')
      .add('.benefit-card', {
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 600,
        delay: stagger(100)
      }, '-=300');
  }
}
