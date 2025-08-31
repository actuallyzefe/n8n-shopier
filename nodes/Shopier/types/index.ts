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

// Order Types
export interface IOrderLineItem {
	productId: string;
	title: string;
	type: 'physical' | 'digital';
	selection?: Array<{
		id: string;
		title: string;
		variationTitle: string;
		options: Array<{
			id: string;
			title: string;
		}>;
	}>;
	quantity: number;
	price: string;
	total: string;
}

export interface IOrderTotals {
	subtotal: string;
	shipping: string;
	discount: string;
	total: string;
}

export interface IOrderDiscount {
	id: string;
	method: 'discountCode' | 'automaticDiscount';
}

export interface IOrderShippingInfo {
	firstName: string;
	lastName: string;
	nationalId?: string;
	email: string;
	phone: string;
	company?: string;
	address: string;
	district?: string;
	city: string;
	state?: string;
	postcode: string;
	country: string;
}

export interface IOrderBillingInfo {
	firstName: string;
	lastName: string;
	nationalId?: string;
	email: string;
	phone: string;
	company?: string;
	taxOffice?: string;
	taxNumber?: string;
	address: string;
	district?: string;
	city: string;
	state?: string;
	postcode: string;
	country: string;
}

export interface IOrderFulfillment {
	orderId: string;
	status: 'shipped' | 'notShipped';
	method: 'standard' | 'contracted';
	type: 'firstShipment' | 'secondShipment' | 'returnShipment';
	dateCreated: string;
	dateDispatched?: string;
	company?: string;
	code?: string;
	trackingNumber?: string;
	trackingUrl?: string;
	size?: string;
	sizeUnit?: 'deci';
	weight?: string;
	weightUnit?: 'gram' | 'kilogram';
	cost?: string;
	currency?: 'TRY' | 'USD' | 'EUR';
}

export interface IOrderReturn {
	orderId: string;
	status: 'shipped' | 'notShipped';
	method: 'standard' | 'contracted';
	type: 'firstShipment' | 'secondShipment' | 'returnShipment';
	dateCreated: string;
	dateDispatched?: string;
	company?: string;
	code?: string;
	trackingNumber?: string;
	trackingUrl?: string;
	size?: string;
	sizeUnit?: 'deci';
	weight?: string;
	weightUnit?: 'gram' | 'kilogram';
	cost?: string;
	currency?: 'TRY' | 'USD' | 'EUR';
}

export interface IOrderRefund {
	id: string;
	type: 'full' | 'partial';
	status: 'pending' | 'failed' | 'succeeded';
	dateCreated: string;
	dateRefunded?: string;
	total: string;
}

export interface IOrder {
	id: string;
	status: 'fulfilled' | 'unfulfilled';
	paymentStatus: 'paid' | 'unpaid';
	installments: boolean;
	dateCreated: string;
	currency: 'TRY' | 'USD' | 'EUR';
	paymentMethod: 'debitCard' | 'creditCard';
	totals: IOrderTotals;
	discounts: IOrderDiscount[];
	shippingInfo: IOrderShippingInfo;
	billingInfo?: IOrderBillingInfo;
	note?: string;
	lineItems: IOrderLineItem[];
	fulfillments: IOrderFulfillment[];
	returns: IOrderReturn[];
	refunds: IOrderRefund[];
}

export interface IOrdersResponse {
	data: IOrder[];
	meta: {
		current_page: number;
		from: number;
		last_page: number;
		per_page: number;
		to: number;
		total: number;
	};
}

// Transaction Types
export interface ITransactionFee {
	currency: 'TRY' | 'USD' | 'EUR';
	amount: string;
}

export interface ITransactionFeeDetail {
	type: 'serviceFee' | 'shippingFee' | 'vat';
	currency: 'TRY' | 'USD' | 'EUR';
	amount: string;
}

export interface ITransactionGross {
	originCurrency: 'TRY' | 'USD' | 'EUR';
	originAmount: string;
	payoutCurrency: 'TRY' | 'USD' | 'EUR';
	payoutAmount: string;
	exchangeRate: string;
}

export interface ITransactionInstallments {
	term: number;
	currency: 'TRY' | 'USD' | 'EUR';
	interestCost: string;
	costBearer: 'buyer' | 'seller';
}

import { IDataObject } from 'n8n-workflow';

export interface ITransactionNet {
	payoutCurrency: 'TRY' | 'USD' | 'EUR';
	payoutAmount: string;
}

export interface IOrderTransaction {
	orderId: string;
	type: 'charge' | 'adjustment';
	description: string;
	dateCreated: string;
	gross: ITransactionGross;
	fee: ITransactionFee[];
	feeDetails: ITransactionFeeDetail[];
	installments: ITransactionInstallments;
	net: ITransactionNet[];
}

export interface IShopierCredentials {
	accessToken: string;
}

export type ShopierResource = 'product' | 'order';

export type ShopierOperation = 'getMany' | 'get' | 'getTransaction';

// Webhook Types
export type ShopierWebhookEvent =
	| 'product.created'
	| 'product.updated'
	| 'order.created'
	| 'order.addressUpdated'
	| 'order.fulfilled'
	| 'refund.requested'
	| 'refund.updated';

export interface IShopierWebhookHeaders {
	'content-length'?: string;
	'content-type'?: string;
	host?: string;
	'user-agent'?: string;
	'shopier-api-version'?: string;
	'shopier-account-id'?: string;
	'shopier-event'?: ShopierWebhookEvent;
	'shopier-webhook-id'?: string;
	'shopier-timestamp'?: string;
	'shopier-signature'?: string;
}

export interface IShopierWebhookPayload {
	event: ShopierWebhookEvent;
	accountId: string;
	webhookId: string;
	timestamp: string;
	apiVersion: string;
	data: IDataObject;
}

// Refund Types for webhooks
export interface IRefund {
	id: string;
	orderId: string;
	status: 'pending' | 'succeeded' | 'failed';
	amount: string;
	currency: 'TRY' | 'USD' | 'EUR';
	reason?: string;
	dateCreated: string;
	dateUpdated?: string;
}
