import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css', './content.component.scss']
})
export class ContentComponent implements OnInit {
  @Input() data: any[] = [];
  categories: any;
  productFilter: any[] = [];
  inputValue: string = '';
  selectedItems: string[] = [];
  count: number = 0;
  basketProduct: any[] = []
  activeValue$: any;
  product$: any[] = []

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
    this.dataService.activeValue$.subscribe(basketActive => {
      this.activeValue$ = basketActive;
    });
    this.dataService.products$.subscribe(allProduct => {
      this.product$ = allProduct
    })
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
    const selectedProduct = this.productFilter.find(item => item.id === productId);
    if (selectedProduct) {
      const existingProduct = this.basketProduct.find(item => item.id === productId);
      if (existingProduct) {
        existingProduct.quantity++;
        this.dataService.incrementCount();
      } else {
        const newProduct = { ...selectedProduct, quantity: 1 };
        this.basketProduct.push(newProduct);
        this.dataService.setProductUpdate(this.basketProduct);
        this.selectedItems.push(productId);
        this.dataService.incrementCount();
      }
    }
  }

  removeFromBasket(productId: string) {
    const index = this.selectedItems.indexOf(productId);
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
      this.dataService.decrementCount();
      const removedProductIndex = this.basketProduct.findIndex(item => item.id === productId);
      if (removedProductIndex !== -1) {
        this.basketProduct.splice(removedProductIndex, 1);
        this.dataService.setProductUpdate(this.basketProduct);
      }
    }
  }

  isItemInBasket(productId: string): boolean {
    const selectedProduct = this.product$.find(item => item.id === productId);
    return selectedProduct
  }

  showButtons(item: any) {
    item.showButtons = true;
  }

  hideButtons() {
    this.productFilter.forEach((item) => {
      item.showButtons = false;
    });
  }

}
