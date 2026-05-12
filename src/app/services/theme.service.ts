import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = signal(false);

  constructor() {
    const saved = globalThis.localStorage?.getItem('theme');
    if (saved === 'dark') {
      this.isDark.set(true);
      document.documentElement.classList.add('dark');
    }

    effect(() => {
      if (this.isDark()) {
        document.documentElement.classList.add('dark');
        globalThis.localStorage?.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        globalThis.localStorage?.setItem('theme', 'light');
      }
    });
  }

  toggle(): void {
    this.isDark.update(v => !v);
  }
}
