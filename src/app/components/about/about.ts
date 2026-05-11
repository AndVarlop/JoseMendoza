import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { createTimeline, stagger } from 'animejs';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ScrollAnimateDirective],
  template: `
    <section id="sobre-mi" class="about section" role="region" aria-labelledby="about-title" appScrollAnimate scrollThreshold="0.2" (visible)="animateSection()">
      <div class="container">
        <div class="about-grid">
          <div class="about-content">
            <span class="section-label">Sobre Mi</span>
            <h2 id="about-title" class="section-title">
              Soy Jose Mendoza, Tecnico especialista en cortinas modernas
            </h2>
            <p class="about-text">
              Con mas de 10 anos de experiencia en el sector, me dedico a transformar 
              espacios a traves de soluciones de cortinas que combinan funcionalidad, 
              estetica y calidad premium.
            </p>
            <p class="about-text">
              Mi enfoque se centra en entender las necesidades de cada cliente, 
              ofreciendo asesoria personalizada desde la seleccion del material 
              hasta la instalacion final. Cada proyecto es una oportunidad para 
              crear ambientes unicos que reflejen tu estilo.
            </p>
            <div class="about-stats">
              <div class="stat">
                <span class="stat-number">500+</span>
                <span class="stat-label">Proyectos Completados</span>
              </div>
              <div class="stat">
                <span class="stat-number">10+</span>
                <span class="stat-label">Anos de Experiencia</span>
              </div>
              <div class="stat">
                <span class="stat-number">100%</span>
                <span class="stat-label">Clientes Satisfechos</span>
              </div>
            </div>
          </div>
          <div class="about-visual">
            <div class="visual-card">
              <div class="card-accent"></div>
              <div class="card-content">
                <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
                <h3>Atencion Personalizada</h3>
                <p>Cada cliente recibe un servicio exclusivo adaptado a sus necesidades y presupuesto.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about {
      background: var(--color-gray-light);
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    
    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
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
      margin-bottom: 1.5rem;
      text-wrap: balance;
      opacity: 0;
    }
    
    .about-text {
      font-size: 1.0625rem;
      color: var(--color-gray-dark);
      line-height: 1.8;
      margin-bottom: 1.25rem;
      opacity: 0;
    }
    
    .about-stats {
      display: flex;
      gap: 2.5rem;
      margin-top: 2.5rem;
      padding-top: 2rem;
      border-top: 1px solid var(--color-gray-medium);
      opacity: 0;
    }
    
    .stat {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    
    .stat-number {
      font-family: var(--font-display);
      font-size: 2.25rem;
      font-weight: 600;
      color: var(--color-accent);
    }
    
    .stat-label {
      font-size: 0.875rem;
      color: var(--color-gray-dark);
    }
    
    .about-visual {
      display: flex;
      justify-content: center;
      opacity: 0;
    }
    
    .visual-card {
      position: relative;
      background: var(--color-white);
      border-radius: var(--radius-lg);
      padding: 2.5rem;
      box-shadow: var(--shadow-lg);
      max-width: 360px;
    }
    
    .card-accent {
      position: absolute;
      top: -8px;
      left: -8px;
      right: -8px;
      bottom: -8px;
      background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-light) 100%);
      border-radius: calc(var(--radius-lg) + 4px);
      z-index: -1;
      opacity: 0.1;
    }
    
    .card-content {
      text-align: center;
    }
    
    .card-icon {
      width: 48px;
      height: 48px;
      color: var(--color-accent);
      margin-bottom: 1.5rem;
    }
    
    .card-content h3 {
      font-family: var(--font-display);
      font-size: 1.375rem;
      font-weight: 600;
      color: var(--color-black);
      margin-bottom: 0.75rem;
    }
    
    .card-content p {
      font-size: 0.9375rem;
      color: var(--color-gray-dark);
      line-height: 1.7;
    }
    
    @media (max-width: 900px) {
      .about-grid {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
      
      .about-visual {
        order: -1;
      }
      
      .about-stats {
        flex-wrap: wrap;
        gap: 1.5rem 2.5rem;
      }
    }
    
    @media (max-width: 480px) {
      .about-stats {
        flex-direction: column;
        gap: 1.5rem;
        align-items: center;
        text-align: center;
      }
    }
  `]
})
export class AboutComponent {

  animateSection(): void {
    const timeline = createTimeline({
      defaults: {
        ease: 'easeOutCubic'
      }
    });

    timeline
      .add('.about .section-label', {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600
      })
      .add('.about .section-title', {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 700
      }, '-=400')
      .add('.about-text', {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600,
        delay: stagger(150)
      }, '-=400')
      .add('.about-stats', {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600
      }, '-=300')
      .add('.about-visual', {
        translateX: [50, 0],
        opacity: [0, 1],
        duration: 800
      }, '-=800');
  }
}
