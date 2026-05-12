import { Component, signal, inject, PLATFORM_ID, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { animate } from 'animejs';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ThemeService } from '../../services/theme.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <header 
      class="navbar" 
      [class.scrolled]="isScrolled()"
      role="banner"
    >
      <nav class="navbar-container" aria-label="Main navigation">
        <a href="#hero" class="logo" aria-label="Jose Mendoza - Inicio">
          <img src="/logo.svg" alt="" class="logo-img" width="36" height="36" aria-hidden="true">
          <span class="logo-text">Jose Mendoza</span>
        </a>
        
        <button 
          class="mobile-toggle" 
          (click)="toggleMobileMenu()"
          [attr.aria-expanded]="isMobileMenuOpen()"
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <span class="hamburger" [class.active]="isMobileMenuOpen()">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        
        <ul 
          class="nav-links" 
          [class.open]="isMobileMenuOpen()"
          id="mobile-menu"
          role="menubar"
        >
          <li role="none" class="nav-controls-item">
            <button 
              class="theme-toggle"
              (click)="theme.toggle()"
              [attr.aria-label]="(theme.isDark() ? 'nav.lightMode' : 'nav.darkMode') | translate"
            >
              @if (theme.isDark()) {
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              } @else {
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              }
            </button>
            <button 
              class="lang-toggle"
              (click)="ts.toggle()"
              aria-label="Toggle language"
            >
              {{ 'nav.lang' | translate }}
            </button>
          </li>
          @for (link of navLinks; track link.href) {
            <li role="none">
              <a 
                [href]="link.href" 
                class="nav-link"
                role="menuitem"
                (click)="closeMobileMenu()"
              >
                {{ link.key | translate }}
              </a>
            </li>
          }
          <li role="none" class="nav-cta-wrapper">
            <a 
              href="https://wa.me/573008032231?text=Hola%20Jose,%20me%20interesa%20cotizar%20cortinas"
              class="nav-cta"
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
            >
              {{ 'nav.quote' | translate }}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      padding: 1rem 0;
      transition: all var(--transition-normal);
      background: transparent;
    }
    
    .navbar.scrolled {
      background: rgba(255, 255, 255, 0.98);
      box-shadow: var(--shadow-md);
      padding: 0.75rem 0;
    }
    
    .navbar-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 0.625rem;
    }
    
    .logo-img {
      border-radius: 6px;
      flex-shrink: 0;
    }

    .logo-text {
      font-family: var(--font-display);
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--color-black);
      letter-spacing: -0.02em;
    }
    
    .navbar:not(.scrolled) .logo-text {
      color: var(--color-white);
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
    
    .nav-link {
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--color-black);
      transition: color var(--transition-fast);
      position: relative;
    }
    
    .navbar:not(.scrolled) .nav-link {
      color: var(--color-white);
    }
    
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--color-accent);
      transition: width var(--transition-fast);
    }
    
    .nav-link:hover::after {
      width: 100%;
    }
    
    .navbar:not(.scrolled) .nav-link::after {
      background: var(--color-white);
    }

    .nav-controls-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-right: 0.5rem;
      list-style: none;
    }

    .nav-controls-item .theme-toggle {
      background: none;
      border: none;
      padding: 0.375rem;
      cursor: pointer;
      color: var(--color-black);
      transition: color var(--transition-fast);
      display: flex;
      align-items: center;
    }

    .navbar:not(.scrolled) .nav-controls-item .theme-toggle {
      color: var(--color-white);
    }

    .nav-controls-item .theme-toggle:hover {
      color: var(--color-accent);
    }

    .nav-controls-item .theme-toggle svg {
      width: 20px;
      height: 20px;
    }

    .nav-controls-item .lang-toggle {
      background: none;
      border: 1px solid var(--color-gray-medium);
      border-radius: var(--radius-sm);
      padding: 0.25rem 0.5rem;
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--color-black);
      transition: all var(--transition-fast);
      line-height: 1;
    }

    .navbar:not(.scrolled) .nav-controls-item .lang-toggle {
      color: var(--color-white);
      border-color: rgba(255, 255, 255, 0.4);
    }

    .nav-controls-item .lang-toggle:hover {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .nav-cta {
      padding: 0.625rem 1.5rem;
      background: var(--color-accent);
      color: var(--color-white);
      border-radius: var(--radius-full);
      font-size: 0.9rem;
      font-weight: 500;
      transition: all var(--transition-fast);
    }
    
    .nav-cta:hover {
      background: var(--color-accent-light);
      transform: translateY(-2px);
    }
    
    .mobile-toggle {
      display: none;
      padding: 0.5rem;
      z-index: 1001;
    }
    
    .hamburger {
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: 24px;
    }
    
    .hamburger span {
      display: block;
      height: 2px;
      background: var(--color-black);
      border-radius: 2px;
      transition: all var(--transition-fast);
    }
    
    .navbar:not(.scrolled) .hamburger span {
      background: var(--color-white);
    }
    
    .hamburger.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
      opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
    
    @media (max-width: 768px) {
      .mobile-toggle {
        display: block;
      }
      
      .nav-links {
        position: fixed;
        top: 0;
        right: -100%;
        width: 80%;
        max-width: 320px;
        height: 100vh;
        background: var(--color-white);
        flex-direction: column;
        justify-content: center;
        gap: 2rem;
        padding: 2rem;
        transition: right var(--transition-normal);
        box-shadow: var(--shadow-xl);
      }
      
      .nav-links.open {
        right: 0;
      }
      
      .navbar .nav-link,
      .navbar:not(.scrolled) .nav-link {
        color: var(--color-black);
        font-size: 1.125rem;
      }
      
      .nav-link::after {
        background: var(--color-accent);
      }

      .nav-controls-item {
        justify-content: center;
        margin-right: 0;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--color-gray-medium);
      }

      .nav-controls-item .theme-toggle {
        color: var(--color-black);
      }

      .nav-controls-item .lang-toggle {
        color: var(--color-black);
        border-color: var(--color-gray-medium);
      }
      
      .nav-cta-wrapper {
        margin-top: 1rem;
      }
    }
  `]
})
export class NavbarComponent {
  private platformId = inject(PLATFORM_ID);

  theme = inject(ThemeService);
  ts = inject(TranslationService);

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);

  navLinks = [
    { href: '#sobre-mi', key: 'nav.about' },
    { href: '#servicios', key: 'nav.services' },
    { href: '#galeria', key: 'nav.gallery' },
    { href: '#testimonios', key: 'nav.testimonials' }
  ];

  constructor() {
    afterNextRender(() => {
      this.initScrollListener();
      this.animateNavbar();
    });
  }

  private initScrollListener(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', () => {
        this.isScrolled.set(window.scrollY > 50);
      }, { passive: true });
    }
  }

  private animateNavbar(): void {
    animate('.navbar', {
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 800,
      ease: 'easeOutCubic'
    });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
