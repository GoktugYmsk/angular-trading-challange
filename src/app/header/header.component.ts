import { Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  @ViewChild('searchInputField', { static: false }) searchInputField!: ElementRef;
  logo = 'https://uploads-ssl.webflow.com/605c9d764f1ef938a009ac98/61e01bfbdd8632a72962edc2_Pinsoft_Yatay_Logo_mavi-for%20animation.svg';
  searchInput: string = '';
  basketCount: number = 0;
  active: any;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private dataService: DataService) { }

  onInputChange() {
    this.dataService.setInputValue(this.searchInput);
  }

  ngOnInit() {
    this.dataService.basketCount$.subscribe(count => {
      this.basketCount = count;
    });

    this.dataService.activeValue$.pipe(takeUntil(this.destroy$)).subscribe(basketActive => {
      this.active = basketActive;
      console.log('header-active-control', this.active);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openBasket(active: boolean) {
    this.dataService.setActiveValue(active);
    console.log('header Acitve', active);
  }

  focusSearchInput() {
    setTimeout(() => {
      this.searchInputField.nativeElement.focus();
    }, 0);
  }
}
