import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @Input() data: any[] = [];
  activeValue$: any
  selectedCategory: string = '';


  ngOnInit() {
    this.dataService.activeValue$.subscribe(basketActive => {
      this.activeValue$ = basketActive
    })
  }

  constructor(private dataService: DataService) {
    this.data = this.dataService.data;
  }

  isDuplicateCategory(category: string, currentIndex: number): boolean {
    for (let i = 0; i < currentIndex; i++) {
      if (this.data[i].category === category) {
        return true;
      }
    }
    return false;
  }

  onCategoryClick(category: string): void {
    this.selectedCategory = category;
    this.dataService.onCategoryClick(category)
  }

  get filteredData(): any[] {
    if (this.selectedCategory) {
      return this.data.filter(item => item.category === this.selectedCategory);
    }
    return this.data;
  }
}
