import {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	IDataObject,
	IHttpRequestMethods,
	IRequestOptions,
	NodeApiError,
} from 'n8n-workflow';

import { IShopierCredentials } from './types';

export async function shopierApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	resource: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	uri?: string,
	headers: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials<IShopierCredentials>('shopierApi');

	const baseUrl = 'https://api.shopier.com/v1';

	const options: IRequestOptions = {
		method,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${credentials.accessToken}`,
			...headers,
		},
		body,
		qs,
		uri: uri || `${baseUrl}${resource}`,
		json: true,
	};

	this.logger.info(JSON.stringify(options, null, 2));

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	try {
		return await this.helpers.request(options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

export async function shopierApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	propertyName: string,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
): Promise<any> {
	const returnData: IDataObject[] = [];

	let responseData;
	query.page = 1;
	// Use the limit from query or default to 50 (API maximum)
	query.limit = query.limit || 50;

	this.logger.info(`Starting pagination with limit: ${query.limit}`);

	do {
		this.logger.info(`Fetching page ${query.page} with limit ${query.limit}`);

		// Make request with full response to get headers
		const credentials = await this.getCredentials<IShopierCredentials>('shopierApi');
		const baseUrl = 'https://api.shopier.com/v1';

		const options: IRequestOptions = {
			method,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${credentials.accessToken}`,
			},
			body,
			qs: query,
			uri: `${baseUrl}${endpoint}`,
			json: true,
			resolveWithFullResponse: true,
		};

		if (Object.keys(body).length === 0) {
			delete options.body;
		}

		const response = await this.helpers.request(options);
		responseData = response.body;
		const responseHeaders = response.headers;

		this.logger.info(`Response headers: ${JSON.stringify(responseHeaders, null, 2)}`);
		this.logger.info(
			`Response data length: ${(responseData[propertyName] || responseData || []).length}`,
		);

		const currentPageData = responseData[propertyName] || responseData || [];
		returnData.push.apply(returnData, currentPageData);

		// Check if there are more pages to fetch using headers
		const currentPage = parseInt(responseHeaders['shopier-pagination-page'] as string) || 1;
		const totalPages = parseInt(responseHeaders['shopier-pagination-total-pages'] as string) || 1;
		const hasMorePages = currentPage < totalPages;

		this.logger.info(
			`Current page: ${currentPage}, Total pages: ${totalPages}, Has more pages: ${hasMorePages}`,
		);

		if (hasMorePages) {
			query.page = currentPage + 1;
			this.logger.info(`Moving to next page: ${query.page}`);
		} else {
			this.logger.info(
				`No more pages to fetch. Current page: ${currentPage}, Total pages: ${totalPages}`,
			);
			break;
		}
	} while (true);

	this.logger.info(`Total items collected: ${returnData.length}`);
	return returnData;
}
