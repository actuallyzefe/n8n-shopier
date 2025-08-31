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
