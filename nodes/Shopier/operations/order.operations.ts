import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';

import { shopierApiRequest, shopierApiRequestAllItems } from '../GenericFunctions';
import {
	ORDERS_ENDPOINTS,
	buildGetOrderByIdEndpoint,
	buildGetOrderTransactionEndpoint,
} from '../endpoints/orders.endpoints';

export async function getOrders(
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
	if (filters.paymentStatus) {
		qs.payment_status = filters.paymentStatus;
	}
	if (filters.currency) {
		qs.currency = filters.currency;
	}
	if (filters.paymentMethod) {
		qs.payment_method = filters.paymentMethod;
	}
	if (filters.createdFrom) {
		qs.created_from = filters.createdFrom;
	}
	if (filters.createdTo) {
		qs.created_to = filters.createdTo;
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
			ORDERS_ENDPOINTS.GET_MANY,
			{},
			qs,
		);

		this.logger.info(JSON.stringify(responseData, null, 2));
	} else {
		const limit = this.getNodeParameter('limit', index) as number;
		qs.limit = limit;

		const response = await shopierApiRequest.call(this, 'GET', ORDERS_ENDPOINTS.GET_MANY, {}, qs);

		this.logger.info(JSON.stringify(response, null, 2));

		responseData = response.data || response || [];
	}

	const executionData = this.helpers.constructExecutionMetaData(
		this.helpers.returnJsonArray(responseData),
		{ itemData: { item: index } },
	);

	return executionData;
}

export async function getOrder(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const orderId = this.getNodeParameter('orderId', index) as string;

	const endpoint = buildGetOrderByIdEndpoint(orderId);

	const responseData = await shopierApiRequest.call(this, 'GET', endpoint);

	this.logger.info(JSON.stringify(responseData, null, 2));

	const executionData = this.helpers.constructExecutionMetaData(
		this.helpers.returnJsonArray([responseData.data || responseData]),
		{ itemData: { item: index } },
	);

	return executionData;
}

export async function getOrderTransaction(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const orderId = this.getNodeParameter('orderId', index) as string;

	const endpoint = buildGetOrderTransactionEndpoint(orderId);

	const responseData = await shopierApiRequest.call(this, 'GET', endpoint);

	this.logger.info(JSON.stringify(responseData, null, 2));

	const executionData = this.helpers.constructExecutionMetaData(
		this.helpers.returnJsonArray([responseData.data || responseData]),
		{ itemData: { item: index } },
	);

	return executionData;
}
