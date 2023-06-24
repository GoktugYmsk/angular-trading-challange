import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @Input() data: any[] = [];
  categories: any;
  productFilter: any[] = [];
  inputValue: string = '';
  selectedItems: string[] = [];
  count: number = 0;

  constructor(private dataService: DataService) {
    this.data = this.dataService.data;
  }

  ngOnInit() {
    this.dataService.categories$.subscribe(categories => {
      this.categories = categories;
      this.filterData();
    });
    this.dataService.inputValue$.subscribe(value => {
      this.inputValue = value;
      this.filterData();
    });
    this.dataService.basketCount$.subscribe(count => {
      this.count = count;
    });

    this.filterData();
  }

  filterData() {
    if (!this.categories && !this.inputValue) {
      this.productFilter = this.data;
      return;
    }

    this.productFilter = this.data.filter((item) => {
      if (this.categories && item.category !== this.categories) {
        return false;
      }
      if (this.inputValue && !item.title.toLowerCase().includes(this.inputValue.toLowerCase())) {
        return false;
      }
      return true;
    });
  }

  addToBasket(productId: string) {
    if (!this.selectedItems.includes(productId)) {
      this.selectedItems.push(productId);
      this.dataService.incrementCount();
    }
  }

  removeFromBasket(productId: string) {
    const index = this.selectedItems.indexOf(productId);
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
      this.dataService.decrementCount();
    }
  }

  isItemInBasket(productId: string): boolean {
    return this.selectedItems.includes(productId);
  }
}
