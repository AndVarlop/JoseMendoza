import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { createTimeline, stagger } from 'animejs';

interface GalleryItem {
  id: number;
  image: string;
  catKey: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [ScrollAnimateDirective, TranslatePipe],
  template: `
    <section id="galeria" class="gallery section" role="region" aria-labelledby="gallery-title" appScrollAnimate scrollThreshold="0.1" (visible)="animateSection()">
      <div class="container">
        <div class="section-header">
          <span class="section-label">{{ 'gallery.label' | translate }}</span>
          <h2 id="gallery-title" class="section-title">
            {{ 'gallery.title' | translate }}
          </h2>
          <p class="section-subtitle">
            {{ 'gallery.subtitle' | translate }}
          </p>
        </div>
        
        <div class="gallery-grid">
          @for (item of galleryItems; track item.id) {
            <div class="gallery-item" [class]="'item-' + item.id">
              <img 
                [src]="item.image" 
                alt=""
                loading="lazy"
              />
              <div class="item-overlay">
                <span class="item-category">{{ item.catKey | translate }}</span>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .gallery {
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
    
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: 280px;
      grid-auto-flow: dense;
      gap: 1.25rem;
    }
    
    .gallery-item {
      position: relative;
      border-radius: var(--radius-lg);
      overflow: hidden;
      cursor: pointer;
      opacity: 0;
    }
    
    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-slow);
    }
    
    .gallery-item:hover img {
      transform: scale(1.08);
    }
    
    .item-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        rgba(17, 17, 17, 0.85) 0%,
        rgba(17, 17, 17, 0.3) 40%,
        transparent 100%
      );
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 1.5rem;
      opacity: 0;
      transition: opacity var(--transition-normal);
    }
    
    .gallery-item:hover .item-overlay {
      opacity: 1;
    }
    
    .item-category {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-accent);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 0.5rem;
      background: var(--color-white);
      padding: 0.25rem 0.75rem;
      border-radius: var(--radius-full);
      width: fit-content;
    }
    
    .item-title {
      font-family: var(--font-display);
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--color-white);
    }
    
    /* Grid layout variations */
    .item-1 {
      grid-column: span 2;
    }
    
    .item-4 {
      grid-column: span 2;
    }
    
    @media (max-width: 900px) {
      .gallery-grid {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: auto;
      }
      
      .gallery-item {
        height: 250px;
      }
      
      .item-1,
      .item-4 {
        grid-column: span 1;
      }
    }
    
    @media (max-width: 640px) {
      .gallery-grid {
        grid-template-columns: 1fr;
      }
      
      .gallery-item {
        height: 220px;
      }
      
      .item-overlay {
        opacity: 1;
      }
    }
  `]
})
export class GalleryComponent {

  private categories = [
    'gallery.blackout',
    'gallery.sheer',
    'gallery.roller',
    'gallery.panel',
    'gallery.other'
  ];

  galleryItems: GalleryItem[] = Array.from({ length: 27 }, (_, index) => {
    const id = index + 1;
    return {
      id,
      image: `/images/Cortina-${id}.jpeg`,
      catKey: this.categories[index % this.categories.length]
    };
  });

  animateSection(): void {
    const timeline = createTimeline({
      defaults: {
        ease: 'easeOutCubic'
      }
    });

    timeline
      .add('.gallery .section-label', {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600
      })
      .add('.gallery .section-title', {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 700
      }, '-=400')
      .add('.gallery .section-subtitle', {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600
      }, '-=400')
      .add('.gallery-item', {
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 600,
        delay: stagger(100)
      }, '-=300');
  }
}
