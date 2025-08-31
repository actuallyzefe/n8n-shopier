export interface IProduct {
	id: number;
	name: string;
	description?: string;
	price: number;
	currency: string;
	stock_quantity: number;
	sku?: string;
	barcode?: string;
	category_id?: number;
	brand?: string;
	weight?: number;
	dimensions?: {
		length?: number;
		width?: number;
		height?: number;
	};
	images?: string[];
	status: 'active' | 'inactive' | 'draft';
	created_at: string;
	updated_at: string;
}

export interface IProductsResponse {
	data: IProduct[];
	meta: {
		current_page: number;
		from: number;
		last_page: number;
		per_page: number;
		to: number;
		total: number;
	};
}

export interface IShopierCredentials {
	accessToken: string;
}

export type ShopierResource = 'product';

export type ShopierOperation = 'getMany' | 'get';
