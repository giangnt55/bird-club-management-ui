import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightUsername]',
})
export class HighlightUsernameDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('input')
  onInput() {
    this.highlightUsernames();
  }

  private highlightUsernames() {
    console.log('OJ');
    const inputText = this.elementRef.nativeElement.value;
    const highlightedText = inputText.replace(
      /@([^\s]+)/g,
      '<span class="highlighted-username">@$1</span>'
    );
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'innerHTML',
      highlightedText
    );
  }
}
