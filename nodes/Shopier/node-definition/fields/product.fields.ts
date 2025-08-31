import { INodeProperties } from 'n8n-workflow';

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
			// IMPORTANT: Date filters (dateStart, dateEnd) are temporarily removed due to Shopier API limitations
			{
				displayName: 'Category IDs',
				name: 'categoryId',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				description: 'Filter by product categories by specifying category ID(s)',
				options: [
					{
						name: 'categoryIds',
						displayName: 'Category IDs',
						values: [
							{
								displayName: 'Category ID',
								name: 'id',
								type: 'string',
								default: '',
								description: 'Category ID to filter by',
							},
						],
					},
				],
			},
			{
				displayName: 'Custom Listing',
				name: 'customListing',
				type: 'boolean',
				default: false,
				description: 'Whether to filter by customized listings',
			},
			{
				displayName: 'Discount',
				name: 'discount',
				type: 'boolean',
				default: false,
				description: 'Whether to filter by products with discounts',
			},
			{
				displayName: 'Product Type',
				name: 'productType',
				type: 'options',
				options: [
					{
						name: 'Physical',
						value: 'physical',
					},
					{
						name: 'Digital',
						value: 'digital',
					},
				],
				default: 'physical',
				description: 'Filter by a product type',
			},
			{
				displayName: 'Selection IDs',
				name: 'selectionId',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				description: 'Filter by product selections by specifying selection ID(s)',
				options: [
					{
						name: 'selectionIds',
						displayName: 'Selection IDs',
						values: [
							{
								displayName: 'Selection ID',
								name: 'id',
								type: 'string',
								default: '',
								description: 'Selection ID to filter by',
							},
						],
					},
				],
			},
			{
				displayName: 'Shipping Payer',
				name: 'shippingPayer',
				type: 'options',
				options: [
					{
						name: 'Buyer Pays',
						value: 'buyerPays',
					},
					{
						name: 'Seller Pays',
						value: 'sellerPays',
					},
				],
				default: 'buyerPays',
				description: 'Filter by who pays for shipping',
			},
			{
				displayName: 'Stock Status',
				name: 'stockStatus',
				type: 'options',
				options: [
					{
						name: 'In Stock',
						value: 'inStock',
					},
					{
						name: 'Out of Stock',
						value: 'outOfStock',
					},
				],
				default: 'inStock',
				description: 'Filter by a stock status',
			},
		],
	},
];
