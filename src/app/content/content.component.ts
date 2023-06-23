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
  filteredData: any[] = [];
  searchInput: string = '';

  constructor(private dataService: DataService) {
    this.data = this.dataService.data;
  }

  ngOnInit() {
    this.dataService.categories$.subscribe(categories => {
      this.categories = categories;
      this.filterData();
    });
  }

 filterData() {
  this.filteredData = this.data.filter(item => {
    const hasCategory = this.hasCategory(item.category.toLowerCase());
    const includesSearchInput = item.title.toLowerCase().includes(this.searchInput.toLowerCase());
    return hasCategory && includesSearchInput;
  });
}

  hasCategory(category: string): boolean {
    return this.categories && this.categories.includes(category);
  }
  

}