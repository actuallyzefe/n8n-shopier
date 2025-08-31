import {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodePropertyOptions,
} from 'n8n-workflow';

import { shopierApiRequest, shopierApiRequestAllItems } from '../GenericFunctions';
import { buildGetProductByIdEndpoint, PRODUCTS_ENDPOINTS } from '../endpoints/products.endpoints';

export async function getProducts(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', index) as boolean;
	const filters = this.getNodeParameter('filters', index, {}) as IDataObject;

	let qs: IDataObject = {};

	// Apply filters
	if (filters.status) {
		qs.status = filters.status;
	}
	if (filters.category_id) {
		qs.category_id = filters.category_id;
	}
	if (filters.sku) {
		qs.sku = filters.sku;
	}
	if (filters.name) {
		qs.name = filters.name;
	}
	if (filters.created_from) {
		qs.created_from = filters.created_from;
	}
	if (filters.created_to) {
		qs.created_to = filters.created_to;
	}

	let responseData: IDataObject[] = [];

	if (returnAll) {
		const limit = this.getNodeParameter('limit', index, 50) as number;
		// For return all, we'll use the user's limit or default to 50 for pagination
		qs.limit = Math.min(limit, 50); // Ensure we don't exceed API maximum

		responseData = await shopierApiRequestAllItems.call(
			this,
			'data',
			'GET',
			PRODUCTS_ENDPOINTS.GET_MANY,
			{},
			qs,
		);

		this.logger.info(JSON.stringify(responseData, null, 2));
	} else {
		const limit = this.getNodeParameter('limit', index) as number;
		qs.limit = limit;

		const response = await shopierApiRequest.call(this, 'GET', PRODUCTS_ENDPOINTS.GET_MANY, {}, qs);

		this.logger.info(JSON.stringify(response, null, 2));

		responseData = response.data || response || [];
	}

	const executionData = this.helpers.constructExecutionMetaData(
		this.helpers.returnJsonArray(responseData),
		{ itemData: { item: index } },
	);

	return executionData;
}

export async function getProduct(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const productId = this.getNodeParameter('productId', index) as string;

	const endpoint = buildGetProductByIdEndpoint(productId);

	const responseData = await shopierApiRequest.call(this, 'GET', endpoint);

	this.logger.info(JSON.stringify(responseData, null, 2));

	const executionData = this.helpers.constructExecutionMetaData(
		this.helpers.returnJsonArray([responseData.data || responseData]),
		{ itemData: { item: index } },
	);

	return executionData;
}

export const statusOptions: INodePropertyOptions[] = [
	{
		name: 'Active',
		value: 'active',
	},
	{
		name: 'Inactive',
		value: 'inactive',
	},
	{
		name: 'Draft',
		value: 'draft',
	},
];
