import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-bird-detail',
  templateUrl: './bird-detail.component.html',
  styleUrls: ['./bird-detail.component.css']
})
export class BirdDetailComponent implements OnInit{

  activeOption: string = '';

  ngOnInit() {
    this.highlightActiveOption();
  }

  scrollTo(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // this.activeOption = elementId;

    }
  }

  highlightActiveOption() {
    const sections = document.getElementsByClassName('content-section');
    let currentSectionId = '';
    const windowHeight = window.innerHeight;
    const middleWindowPosition = windowHeight / 2;

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i] as HTMLElement;
      const rect = section.getBoundingClientRect();
      if (rect.top <= middleWindowPosition && rect.bottom >= middleWindowPosition) {
        currentSectionId = section.id;
        break;
      }
    }

    this.activeOption = currentSectionId;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.highlightActiveOption();
  }
}
