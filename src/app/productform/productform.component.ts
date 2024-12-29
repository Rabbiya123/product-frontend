import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  product: any = { id: 0, name: '', price: 0 };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const data = this.route.snapshot.params;
    if (data) {
      this.product = data;
    }
  }

  saveProduct() {
    if (this.product.id) {
      this.productService
        .updateProduct(this.product.id, this.product)
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    } else {
      this.productService.addProduct(this.product).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
