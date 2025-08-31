import { INodePropertyOptions } from 'n8n-workflow';

export const resources: INodePropertyOptions[] = [
	{
		name: 'Product',
		value: 'product',
		description: 'Work with products',
	},
	{
		name: 'Order',
		value: 'order',
		description: 'Work with orders',
	},
];
