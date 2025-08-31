import { INodePropertyOptions } from 'n8n-workflow';

export const productOperations: INodePropertyOptions[] = [
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
];

export const orderOperations: INodePropertyOptions[] = [
	{
		name: 'Get Many',
		value: 'getMany',
		description: 'Retrieve many orders',
		action: 'Get many orders',
	},
	{
		name: 'Get',
		value: 'get',
		description: 'Retrieve an order',
		action: 'Get an order',
	},
	{
		name: 'Get Transaction',
		value: 'getTransaction',
		description: 'Retrieve an order transaction',
		action: 'Get an order transaction',
	},
];
