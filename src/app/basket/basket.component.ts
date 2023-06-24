import { Component, HostListener, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css', './basket.component.scss']
})
export class BasketComponent implements OnInit {
  @Input() data: any[] = [];

  activeValue: boolean = false;
  basketProduct: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.activeValue$.subscribe(basketActive => {
      this.activeValue = basketActive;
      console.log(this.activeValue);
    });

    this.dataService.basketProduct$.subscribe(productItem => {
      this.basketProduct = productItem;
      console.log('basket', this.basketProduct);
    });
  }

  @HostListener('document:keydown.escape')
  handleEscapeKey() {
    this.activeValue = false;
    console.log(this.activeValue);
  }
}
