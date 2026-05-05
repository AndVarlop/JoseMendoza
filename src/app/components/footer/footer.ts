import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer" role="contentinfo">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="#hero" class="logo" aria-label="Jose Mendoza - Inicio">
              <span class="logo-text">Jose Mendoza</span>
            </a>
            <p class="brand-tagline">
              Especialista en cortinas modernas. Transformando espacios en Barranquilla desde hace mas de 10 anos.
            </p>
          </div>
          
          <div class="footer-links">
            <h3>Enlaces</h3>
            <nav aria-label="Footer navigation">
              <ul>
                <li><a href="#sobre-mi">Sobre Mi</a></li>
                <li><a href="#servicios">Servicios</a></li>
                <li><a href="#galeria">Galeria</a></li>
                <li><a href="#testimonios">Testimonios</a></li>
              </ul>
            </nav>
          </div>
          
          <div class="footer-services">
            <h3>Servicios</h3>
            <ul>
              <li>Cortinas Blackout</li>
              <li>Cortinas Sheer</li>
              <li>Cortinas Enrollables</li>
              <li>Panel Japones</li>
            </ul>
          </div>
          
          <div class="footer-contact">
            <h3>Contacto</h3>
            <ul class="contact-list">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Barranquilla, Colombia</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer">
                  +57 300 123 4567
                </a>
              </li>
            </ul>
            <div class="social-links">
              <a 
                href="https://wa.me/573001234567" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com/josemendozacortinas" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://facebook.com/josemendozacortinas" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} Jose Mendoza. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--color-black);
      padding: 4rem 0 1.5rem;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    
    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1.5fr;
      gap: 3rem;
      padding-bottom: 3rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .logo-text {
      font-family: var(--font-display);
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--color-white);
    }
    
    .brand-tagline {
      margin-top: 1rem;
      font-size: 0.9375rem;
      color: rgba(255, 255, 255, 0.6);
      line-height: 1.7;
      max-width: 280px;
    }
    
    .footer-links h3,
    .footer-services h3,
    .footer-contact h3 {
      font-size: 1rem;
      font-weight: 600;
      color: var(--color-white);
      margin-bottom: 1.25rem;
    }
    
    .footer-links ul,
    .footer-services ul {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .footer-links a,
    .footer-services li {
      font-size: 0.9375rem;
      color: rgba(255, 255, 255, 0.6);
      transition: color var(--transition-fast);
    }
    
    .footer-links a:hover {
      color: var(--color-white);
    }
    
    .contact-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .contact-list li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.9375rem;
      color: rgba(255, 255, 255, 0.6);
    }
    
    .contact-list svg {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }
    
    .contact-list a {
      color: rgba(255, 255, 255, 0.6);
      transition: color var(--transition-fast);
    }
    
    .contact-list a:hover {
      color: var(--color-white);
    }
    
    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    
    .social-links a {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      color: var(--color-white);
      transition: all var(--transition-fast);
    }
    
    .social-links a:hover {
      background: var(--color-accent);
      transform: translateY(-3px);
    }
    
    .social-links svg {
      width: 18px;
      height: 18px;
    }
    
    .footer-bottom {
      padding-top: 1.5rem;
      text-align: center;
    }
    
    .footer-bottom p {
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.4);
    }
    
    @media (max-width: 900px) {
      .footer-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 2.5rem;
      }
      
      .footer-brand {
        grid-column: span 2;
      }
    }
    
    @media (max-width: 640px) {
      .footer-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .footer-brand {
        grid-column: span 1;
      }
      
      .brand-tagline {
        max-width: none;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
