import { Component, signal, inject, PLATFORM_ID, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import anime from 'animejs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <header 
      class="navbar" 
      [class.scrolled]="isScrolled()"
      role="banner"
    >
      <nav class="navbar-container" aria-label="Main navigation">
        <a href="#hero" class="logo" aria-label="Jose Mendoza - Inicio">
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
          @for (link of navLinks; track link.href) {
            <li role="none">
              <a 
                [href]="link.href" 
                class="nav-link"
                role="menuitem"
                (click)="closeMobileMenu()"
              >
                {{ link.label }}
              </a>
            </li>
          }
          <li role="none" class="nav-cta-wrapper">
            <a 
              href="https://wa.me/573001234567?text=Hola%20Jose,%20me%20interesa%20cotizar%20cortinas"
              class="nav-cta"
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
            >
              Cotizar
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
      gap: 0.5rem;
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
      
      .nav-link {
        color: var(--color-black);
        font-size: 1.125rem;
      }
      
      .nav-link::after {
        background: var(--color-accent);
      }
      
      .nav-cta-wrapper {
        margin-top: 1rem;
      }
    }
  `]
})
export class NavbarComponent {
  private platformId = inject(PLATFORM_ID);
  
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  
  navLinks = [
    { href: '#sobre-mi', label: 'Sobre Mi' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#galeria', label: 'Galeria' },
    { href: '#testimonios', label: 'Testimonios' }
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
      });
    }
  }
  
  private animateNavbar(): void {
    anime({
      targets: '.navbar',
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutCubic'
    });
  }
  
  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }
  
  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
