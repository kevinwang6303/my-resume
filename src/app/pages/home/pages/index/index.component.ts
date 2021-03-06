import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";

import { fromEvent, Observable } from "rxjs";
@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"]
})
export class IndexComponent implements OnInit, AfterViewInit {
  @ViewChild("video")
  video!: ElementRef;
  @ViewChild("menu")
  menuElm!: ElementRef;
  @ViewChild('about')
  about!: ElementRef;
  @ViewChild('experience')
  experience!: ElementRef;
  @ViewChild('skills')
  skills!: ElementRef;
  @ViewChild('trait')
  trait!: ElementRef;

  scrollEvent: Observable<any>;
  toDay = new Date();

  menuArray = [
    {
      name: 'ABOUT',
      active: true
    },
    {
      name: 'EXPERIENCE',
      active: false
    },
    {
      name: 'SKILLS',
      active: false
    },
    {
      name: 'TRAIT',
      active: false
    }
  ];

  constructor() {
    this.scrollEvent = fromEvent(window, 'scroll');
    this.scrollEvent.subscribe(() => {
      const tempWidth = window.innerWidth;

      if (tempWidth < 1064) {
        this.setFixed(60);
      } else {
        this.setFixed(0);
      }
      this.menuArray.forEach(x => {
        x.active = false;
      });
      this.checkAction(this.about, 0);
      this.checkAction(this.experience, 1);
      this.checkAction(this.skills, 2);
      this.checkAction(this.trait, 3);
    });
  }

  ngOnInit() { }

  checkAction(item: any, index: any) {
    const tempItem = item.nativeElement.getBoundingClientRect();
    if (0 < tempItem.top && tempItem.top < window.innerHeight) {
      this.menuArray[index].active = true;
    }
  }

  ngAfterViewInit() {
    this.video.nativeElement.muted = true;
  }

  private setFixed(value: any) {
    if (
      this.menuElm.nativeElement.parentElement.getBoundingClientRect().top <
      value
    ) {
      this.menuElm.nativeElement.classList.add('fixed');
    } else {
      this.menuElm.nativeElement.classList.remove('fixed');
    }
  }

  goMenu(index: any) {
    let ele;
    this.menuArray.forEach(item => {
      item.active = false;
    });
    this.menuArray[index].active = true;
    switch (index) {
      case 0:
        ele = this.about.nativeElement;
        break;
      case 1:
        ele = this.experience.nativeElement;
        break;
      case 2:
        ele = this.skills.nativeElement;
        break;
      case 3:
        ele = this.trait.nativeElement;
        break;

      default:
        break;
    }
    ele.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });

    this.menuElm.nativeElement.style.opacity = '.5';
    setTimeout(() => {
      const tempWidth = document.body.offsetWidth < 1064 ? 100 : 50;
      window.scroll({
        top: window.scrollY - tempWidth,
        left: 0,
        behavior: 'smooth'
      });
      this.menuElm.nativeElement.style.opacity = '1';
    }, 1500);
  }

  goTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
}
