import { Component, HostListener, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css', './basket.component.scss']
})
export class BasketComponent implements OnInit {
  @Input() data: any[] = [];

  activeValue$: any;
  products$: any[] = [];
  totalPrice: number = 0;
  basketProduct: any[] = []
  

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.activeValue$.subscribe(basketActive => {
      this.activeValue$ = basketActive;
    });
    this.dataService.products$.subscribe(showProduct => {
      this.products$ = showProduct;
      this.calculateTotalPrice();
      console.log('basket', this.products$);
    });
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    for (const item of this.products$) {
      this.totalPrice += (item.price * (item.count || 1));
    }
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2)); 
    return this.totalPrice;
  }

  removeFromBasket(item: any) {
    const index = this.products$.indexOf(item);
    if (index !== -1) {
      this.products$.splice(index, 1);
      this.calculateTotalPrice();
      this.dataService.decrementCount()
      console.log('baskettaki product',this.products$)
    }
  }

  updateItemCount(item: any) {
    if (item.count < 1) {
      item.count = 1; 
    }
    this.calculateTotalPrice();
  }  

  @HostListener('document:keydown.escape')
  handleEscapeKey() {
    this.activeValue$ = false;
    console.log('basket active',this.activeValue$);
  }
}
