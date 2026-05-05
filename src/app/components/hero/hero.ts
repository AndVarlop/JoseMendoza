import { Component, afterNextRender } from '@angular/core';
import anime from 'animejs';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section id="hero" class="hero" role="region" aria-label="Hero">
      <div class="hero-bg">
        <img 
          src="/images/hero-bg.jpg" 
          alt=""
          loading="eager"
          aria-hidden="true"
        />
        <div class="hero-overlay"></div>
      </div>
      
      <div class="hero-content">
        <span class="hero-badge">Barranquilla, Colombia</span>
        <h1 class="hero-title">
          Transforma tus espacios con cortinas 
          <span class="highlight">modernas y elegantes</span>
        </h1>
        <p class="hero-subtitle">
          Instalacion profesional de cortinas de alta calidad. 
          Diseno, asesoria y montaje personalizado para hogares y oficinas.
        </p>
        <div class="hero-actions">
          <a 
            href="https://wa.me/573001234567?text=Hola%20Jose,%20me%20interesa%20cotizar%20cortinas"
            class="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg class="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Cotiza por WhatsApp
          </a>
          <a href="#servicios" class="btn-secondary">
            Ver Servicios
          </a>
        </div>
      </div>
      
      <div class="scroll-indicator" aria-hidden="true">
        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <span>Desliza</span>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    
    .hero-bg {
      position: absolute;
      inset: 0;
      z-index: 0;
    }
    
    .hero-bg img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        rgba(17, 17, 17, 0.85) 0%,
        rgba(17, 17, 17, 0.6) 50%,
        rgba(17, 17, 17, 0.75) 100%
      );
    }
    
    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 800px;
      padding: 6rem 1.5rem 2rem;
      text-align: center;
    }
    
    .hero-badge {
      display: inline-block;
      padding: 0.5rem 1.25rem;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: var(--radius-full);
      color: var(--color-white);
      font-size: 0.875rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      margin-bottom: 1.5rem;
      opacity: 0;
    }
    
    .hero-title {
      font-family: var(--font-display);
      font-size: clamp(2.5rem, 6vw, 4rem);
      font-weight: 600;
      color: var(--color-white);
      line-height: 1.15;
      margin-bottom: 1.5rem;
      text-wrap: balance;
      opacity: 0;
    }
    
    .hero-title .highlight {
      color: var(--color-gray-medium);
    }
    
    .hero-subtitle {
      font-size: clamp(1rem, 2vw, 1.25rem);
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.7;
      max-width: 600px;
      margin: 0 auto 2.5rem;
      opacity: 0;
    }
    
    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
      opacity: 0;
    }
    
    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 2rem;
      background: #25D366;
      color: var(--color-white);
      border-radius: var(--radius-full);
      font-size: 1rem;
      font-weight: 600;
      transition: all var(--transition-fast);
    }
    
    .btn-primary:hover {
      background: #20BD5A;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(37, 211, 102, 0.3);
    }
    
    .whatsapp-icon {
      width: 20px;
      height: 20px;
    }
    
    .btn-secondary {
      display: inline-flex;
      align-items: center;
      padding: 1rem 2rem;
      background: transparent;
      color: var(--color-white);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: var(--radius-full);
      font-size: 1rem;
      font-weight: 500;
      transition: all var(--transition-fast);
    }
    
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.5);
    }
    
    .scroll-indicator {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0;
    }
    
    .mouse {
      width: 24px;
      height: 36px;
      border: 2px solid rgba(255, 255, 255, 0.4);
      border-radius: 12px;
      display: flex;
      justify-content: center;
      padding-top: 6px;
    }
    
    .wheel {
      width: 3px;
      height: 8px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 2px;
      animation: scroll 2s infinite;
    }
    
    @keyframes scroll {
      0% {
        opacity: 1;
        transform: translateY(0);
      }
      100% {
        opacity: 0;
        transform: translateY(12px);
      }
    }
    
    @media (max-width: 640px) {
      .hero-content {
        padding: 7rem 1rem 2rem;
      }
      
      .hero-actions {
        flex-direction: column;
        width: 100%;
        padding: 0 1rem;
      }
      
      .btn-primary,
      .btn-secondary {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class HeroComponent {
  constructor() {
    afterNextRender(() => {
      this.animateHero();
    });
  }

  private animateHero(): void {
    const timeline = anime.timeline({
      easing: 'easeOutCubic'
    });

    timeline
      .add({
        targets: '.hero-badge',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800
      })
      .add({
        targets: '.hero-title',
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 1000
      }, '-=500')
      .add({
        targets: '.hero-subtitle',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800
      }, '-=600')
      .add({
        targets: '.hero-actions',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800
      }, '-=500')
      .add({
        targets: '.scroll-indicator',
        opacity: [0, 1],
        duration: 600
      }, '-=300');
  }
}
