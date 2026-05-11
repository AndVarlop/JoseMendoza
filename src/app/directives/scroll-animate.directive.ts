import { Directive, ElementRef, inject, input, output, numberAttribute, afterNextRender } from '@angular/core';

@Directive({
  selector: '[appScrollAnimate]',
  standalone: true,
})
export class ScrollAnimateDirective {
  readonly scrollThreshold = input(0.15, { transform: numberAttribute });
  readonly visible = output<void>();
  private el = inject(ElementRef);
  private hasTriggered = false;

  constructor() {
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !this.hasTriggered) {
            this.hasTriggered = true;
            this.visible.emit();
            observer.disconnect();
          }
        },
        { threshold: this.scrollThreshold() }
      );
      observer.observe(this.el.nativeElement);
    });
  }
}
