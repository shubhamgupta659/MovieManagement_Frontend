import {Component} from '@angular/core';
import { ProductService } from './productservice';
import { Product } from './product';

@Component({
  selector: 'app-movie-dataview',
  templateUrl: './movie-dataview.component.html',
  styleUrls: ['./movie-dataview.component.css']
})
export class MovieDataviewComponent{

  products: Product[];

  sortOrder: number;

  sortField: string;

  constructor(private productService: ProductService) { }

  ngOnInit() {
      this.productService.getProducts().then(data => this.products = data);
  }
  
}
