import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";


@Injectable()
export class ProductsService {
	private products: Product[] = [];	

	insertProduct(title: string, desc: string, price: number) {
		const prodId = Math.random().toString();
		const newProduct = new Product(prodId, title, desc, price);
		this.products.push(newProduct);
		return prodId;
	}

	getProducts() {
		return [...this.products];
	}

	getSingleProduct(productId: string) {
		const product = this.findProduct(productId)[0];
		return {...product};
	}

	updateProduct(productId: string, title: string, desc: string, price: number) {
		const [product, index] = this.findProduct(productId);
		const updated = {...product};
		if(title) {
			updated.title = title;
		} 
		if(desc) {
			updated.description = desc;
		} 
		if(price) {
			updated.price = price;
		} 
		this.products[index] = updated;
	}

	private findProduct(id: string): [Product, number] {
		const productIndex = this.products.findIndex(prod => prod.id == id);
		const product = this.products[productIndex];
		if(!product) {
			throw new NotFoundException('Could not find product');
		}
		return [product, productIndex];
	}

	deleteProduct(prodId: string) {
		const index = this.findProduct(prodId)[1];
		this.products.splice(index, 1);
	}
 }
