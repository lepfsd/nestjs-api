import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { async } from "rxjs/internal/scheduler/async";

@Controller('products')
export class ProductsController {

	constructor(private readonly productsService: ProductsService){}

	@Post()
	async addProduct(
		@Body('title') prodTitle: string, 
		@Body('description') prodDesc: string, 
		@Body('price') prodPrice: number ) {

		const generatedId = await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
		return {id: generatedId, message: "product saved!"};
	}

	@Get()
	async getAllProducts() {
		const products = await this.productsService.getProducts();
		return products.map((prod) => ({id: prod.id, title: prod.title, description: prod.description, price: prod.price}));
	}

	@Get(':id')
	getProduct(@Param('id') prodId: string) {
		return this.productsService.getSingleProduct(prodId);
	}

	@Patch(':id')
	async updateProduct(
		@Param('id') prodId: string,
		@Body('title') prodTitle: string, 
		@Body('description') prodDesc: string, 
		@Body('price') prodPrice: number) {

			await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
			return {message: "product updated!"};
		}
	
	@Delete(':id')
	async removeProduct(@Param('id') prodId: string) {
		await this.productsService.deleteProduct(prodId);
		return {message: "product deleted!"}; 
	}

}