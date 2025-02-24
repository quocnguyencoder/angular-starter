// filepath: /Users/nguyenquoc/Code/angular-starter/src/app/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from './product.service';
import { EditProductDialogComponent } from './edit-product-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  products: Product[] = [];
  newProduct: Product = { id: 0, name: '', price: 0 };
  displayedColumns: string[] = ['name', 'price', 'actions'];

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) {
    this.products = this.productService.getProducts();
  }

  addProduct(form: NgForm): void {
    if (this.newProduct.name && this.newProduct.price) {
      this.newProduct.id = new Date().getTime();
      this.productService.addProduct(this.newProduct);
      this.products = this.productService.getProducts();
      this.newProduct = { id: 0, name: '', price: 0 };
      form.resetForm();
    }
  }

  editProduct(product: Product): void {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '400px',
      data: { ...product },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.updateProduct(result);
        this.products = this.productService.getProducts();
      }
    });
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId);
    this.products = this.productService.getProducts();
  }
}
