import { Component, ElementRef, inject, afterNextRender, PLATFORM_ID, viewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { createTimeline } from 'animejs';

@Component({
  selector: 'app-cta',
  standalone: true,
  template: `
    <section class="cta section" role="region" aria-labelledby="cta-title" #ctaSection>
      <div class="cta-bg"></div>
      <div class="container">
        <div class="cta-content">
          <h2 id="cta-title" class="cta-title">
            Dale un nuevo estilo a tu espacio hoy mismo
          </h2>
          <p class="cta-subtitle">
            Solicita una cotizacion sin compromiso. Te asesoro para encontrar 
            las cortinas perfectas para tu hogar u oficina.
          </p>
          <a 
            href="https://wa.me/573008032231?text=Hola%20Jose,%20me%20interesa%20cotizar%20cortinas"
            class="cta-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg class="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Escribeme por WhatsApp
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .cta {
      position: relative;
      background: var(--color-accent);
      overflow: hidden;
    }
    
    .cta-bg {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-light) 100%);
    }
    
    .cta-bg::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -20%;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
      border-radius: 50%;
    }
    
    .cta-bg::after {
      content: '';
      position: absolute;
      bottom: -30%;
      left: -10%;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
      border-radius: 50%;
    }
    
    .container {
      position: relative;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    
    .cta-content {
      text-align: center;
      max-width: 640px;
      margin: 0 auto;
    }
    
    .cta-title {
      font-family: var(--font-display);
      font-size: clamp(2rem, 4vw, 2.75rem);
      font-weight: 600;
      color: var(--color-white);
      line-height: 1.2;
      margin-bottom: 1.25rem;
      text-wrap: balance;
      opacity: 0;
    }
    
    .cta-subtitle {
      font-size: 1.125rem;
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.7;
      margin-bottom: 2.5rem;
      opacity: 0;
    }
    
    .cta-button {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1.125rem 2.5rem;
      background: var(--color-white);
      color: var(--color-accent);
      border-radius: var(--radius-full);
      font-size: 1.0625rem;
      font-weight: 600;
      transition: all var(--transition-fast);
      opacity: 0;
    }
    
    .cta-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
    }
    
    .whatsapp-icon {
      width: 22px;
      height: 22px;
      color: #25D366;
    }
    
    @media (max-width: 640px) {
      .cta-button {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class CtaComponent {
  private platformId = inject(PLATFORM_ID);
  ctaSection = viewChild<ElementRef>('ctaSection');
  private hasAnimated = false;

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
      { threshold: 0.3 }
    );

    const section = this.ctaSection();
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
      .add('.cta-title', {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 700
      })
      .add('.cta-subtitle', {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600
      }, '-=400')
      .add('.cta-button', {
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 500
      }, '-=300');
  }
}
