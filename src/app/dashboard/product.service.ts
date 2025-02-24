import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private storageKey = 'products';

  getProducts(): Product[] {
    const products = localStorage.getItem(this.storageKey);
    return products ? JSON.parse(products) : [];
  }

  addProduct(product: Product): void {
    const products = this.getProducts();
    products.push(product);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  updateProduct(updatedProduct: Product): void {
    const products = this.getProducts();
    const index = products.findIndex(
      (product) => product.id === updatedProduct.id
    );
    if (index !== -1) {
      products[index] = updatedProduct;
      localStorage.setItem(this.storageKey, JSON.stringify(products));
    }
  }

  deleteProduct(productId: number): void {
    let products = this.getProducts();
    products = products.filter((product) => product.id !== productId);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }
}
