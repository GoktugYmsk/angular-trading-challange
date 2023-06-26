import { Component, HostListener, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css', './basket.component.scss']
})
export class BasketComponent implements OnInit {
  @Input() data: any[] = [];

  activeValue$: any
  products$: any[] = [];
  totalPrice: number = 0;

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

  @HostListener('document:keydown.escape')
  handleEscapeKey() {
    this.activeValue$ = false;
    console.log(this.activeValue$);
  }
}
