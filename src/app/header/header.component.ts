import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  logo = 'https://uploads-ssl.webflow.com/605c9d764f1ef938a009ac98/61e01bfbdd8632a72962edc2_Pinsoft_Yatay_Logo_mavi-for%20animation.svg';
  searchInput: string = '';
  basketCount: number = 0;

  constructor(private dataService: DataService) { }

  onInputChange() {
    this.dataService.setInputValue(this.searchInput);
  }

  ngOnInit() {
    this.dataService.basketCount$.subscribe(count => {
      this.basketCount = count
    })
  }

  openBasket(active: boolean) {
    this.dataService.setActiveValue(active);
  }

}
