import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';

import { productFields } from './node-definition';
import { getProduct, getProducts } from './operations';
import { ShopierResource, ShopierOperation } from './types';

export class Shopier implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Shopier',
		name: 'shopier',
		icon: 'file:shopier.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Shopier API',
		defaults: {
			name: 'Shopier',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'shopierApi',
				required: true,
			},
		],
		requestDefaults: {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			baseURL: 'https://api.shopier.com',
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Product',
						value: 'product',
						description: 'Work with products',
					},
				],
				default: 'product',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['product'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Retrieve many products',
						action: 'Get many products',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Retrieve a product',
						action: 'Get a product',
					},
				],
				default: 'getMany',
			},
			...productFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as ShopierResource;
		const operation = this.getNodeParameter('operation', 0) as ShopierOperation;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: INodeExecutionData[] = [];

				if (resource === 'product') {
					if (operation === 'getMany') {
						this.logger.info('Getting many products');
						responseData = await getProducts.call(this, i);
					} else if (operation === 'get') {
						responseData = await getProduct.call(this, i);
					} else {
						throw new NodeOperationError(
							this.getNode(),
							`The operation "${operation}" is not supported for resource "${resource}"`,
							{ itemIndex: i },
						);
					}
				} else {
					throw new NodeOperationError(
						this.getNode(),
						`The resource "${resource}" is not supported`,
						{ itemIndex: i },
					);
				}

				returnData.push(...responseData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: error.message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionErrorData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
