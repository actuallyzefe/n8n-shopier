import { INodeProperties } from 'n8n-workflow';
import { statusOptions } from '../../operations/product.operations';

export const productFields: INodeProperties[] = [
	// Product ID (for get operation)
	{
		displayName: 'Product ID',
		name: 'productId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the product to retrieve',
	},

	// Return All (for getMany operation)
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['getMany'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},

	// Limit (for getMany operation)
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['getMany'],
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
	},

	// Filters (for getMany operation)
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['getMany'],
			},
		},
		options: [
			{
				displayName: 'Category ID',
				name: 'category_id',
				type: 'number',
				default: 0,
				description: 'Filter by category ID',
			},
			{
				displayName: 'Created From',
				name: 'created_from',
				type: 'dateTime',
				default: '',
				description: 'Filter products created from this date',
			},
			{
				displayName: 'Created To',
				name: 'created_to',
				type: 'dateTime',
				default: '',
				description: 'Filter products created until this date',
			},
			{
				displayName: 'Product Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Filter by product name (partial match)',
			},
			{
				displayName: 'SKU',
				name: 'sku',
				type: 'string',
				default: '',
				description: 'Filter by product SKU',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: statusOptions,
				default: '',
				description: 'Filter by product status',
			},
		],
	},
];
