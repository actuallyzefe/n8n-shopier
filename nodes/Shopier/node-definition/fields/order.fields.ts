import { INodeProperties } from 'n8n-workflow';

export const orderFields: INodeProperties[] = [
	// Get Many Orders
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['getMany'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['getMany'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['getMany'],
			},
		},
		options: [
			// IMPORTANT: Date filters (dateStart, dateEnd) are temporarily removed due to Shopier API limitations
			{
				displayName: 'Fulfillment Status',
				name: 'fulfillmentStatus',
				type: 'options',
				options: [
					{
						name: 'Unfulfilled',
						value: 'unfulfilled',
					},
					{
						name: 'Fulfilled',
						value: 'fulfilled',
					},
				],
				default: '',
				description: 'Filter by fulfillment status',
			},
			{
				displayName: 'Refund Type',
				name: 'refundType',
				type: 'options',
				options: [
					{
						name: 'None',
						value: 'none',
					},
					{
						name: 'Partial',
						value: 'partial',
					},
					{
						name: 'Full',
						value: 'full',
					},
				],
				default: '',
				description: 'Filter by refund type',
			},
			{
				displayName: 'Customer Email',
				name: 'customerEmail',
				type: 'string',
				default: '',
				description: "Filter by a customer's email address",
			},
			{
				displayName: 'Customer Phone',
				name: 'customerPhone',
				type: 'string',
				default: '',
				description: "Filter by a customer's phone number",
			},
		],
	},
	// Get Order
	{
		displayName: 'Order ID',
		name: 'orderId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['get', 'getTransaction'],
			},
		},
		default: '',
		description: 'The ID of the order to retrieve',
	},
];
