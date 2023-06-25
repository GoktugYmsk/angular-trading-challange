import { Component, HostListener, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css', './basket.component.scss']
})
export class BasketComponent implements OnInit {
  @Input() data: any[] = [];

  activeValue$: boolean = false;
  products$: any[] = []

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.activeValue$.subscribe(basketActive => {
      this.activeValue$ = basketActive;
    });
    this.dataService.products$.subscribe(showProduct => {
      this.products$ = showProduct
      console.log('basket', this.products$)
    })
    }

  @HostListener('document:keydown.escape')
    handleEscapeKey() {
      this.activeValue$ = false;
      console.log(this.activeValue$);
    }
  }
