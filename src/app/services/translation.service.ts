import { Injectable, signal } from '@angular/core';
import es from './translations-es.json';
import en from './translations-en.json';

type Lang = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  currentLang = signal<Lang>(this.getInitialLang());
  private dict: Record<Lang, Record<string, string>> = { es, en };

  private getInitialLang(): Lang {
    return (globalThis.localStorage?.getItem('lang') as Lang) || 'es';
  }

  t(key: string): string {
    return this.dict[this.currentLang()]?.[key] ?? key;
  }

  setLang(lang: Lang): void {
    this.currentLang.set(lang);
    globalThis.localStorage?.setItem('lang', lang);
    document.documentElement.lang = lang;
  }

  toggle(): void {
    this.setLang(this.currentLang() === 'es' ? 'en' : 'es');
  }
}
