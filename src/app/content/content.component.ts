import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css','./content.component.scss']
})
export class ContentComponent implements OnInit {
  @Input() data: any[] = [];
  categories: any;
  productFilter: any[] = [];
  inputValue: string = '';
  selectedItems: string[] = [];
  count: number = 0;
  basketProduct: any[] = []

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
    const selectedProduct = this.data.find(item => item.id === productId);
    if (selectedProduct) {
      for (let i = 0; i < this.selectedItems.length; i++) {
        const existingProduct = this.data.find(item => item.id === this.selectedItems[i]);
        if (existingProduct && existingProduct.id === productId) {
          // Eğer seçilen ürün zaten sepete eklenmişse, burada istediğiniz işlemi yapabilirsiniz
          // Örneğin, ürünün miktarını artırabilirsiniz
          existingProduct.quantity++; // Örnek olarak, ürün miktarını bir artırıyoruz
          this.dataService.incrementCount(); // Toplam ürün sayısını güncelliyoruz
          return; // Fonksiyondan çıkıyoruz
        }
      }

      // Eğer seçilen ürün daha önce sepete eklenmemişse, yeni bir ürün olarak ekliyoruz
      const newProduct = { ...selectedProduct, quantity: 1 };
      this.basketProduct.push(newProduct); // Yeni ürünü basketProduct dizisine ekliyoruz
      this.dataService.setProductUpdate(this.basketProduct);
      this.selectedItems.push(productId); // Seçilen ürünün ID'sini selectedItems dizisine ekliyoruz
      this.dataService.incrementCount(); // Toplam ürün sayısını güncelliyoruz
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
    return this.selectedItems.includes(productId);
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
