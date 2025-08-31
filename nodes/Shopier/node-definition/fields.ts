import { INodeProperties } from 'n8n-workflow';

import { productFields } from './fields/product.fields';

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
			{
				displayName: 'Created From',
				name: 'createdFrom',
				type: 'dateTime',
				default: '',
				description: 'Filter orders created from this date',
			},
			{
				displayName: 'Created To',
				name: 'createdTo',
				type: 'dateTime',
				default: '',
				description: 'Filter orders created until this date',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'options',
				options: [
					{
						name: 'TRY',
						value: 'TRY',
					},
					{
						name: 'USD',
						value: 'USD',
					},
					{
						name: 'EUR',
						value: 'EUR',
					},
				],
				default: 'TRY',
				description: 'Filter by currency',
			},
			{
				displayName: 'Payment Method',
				name: 'paymentMethod',
				type: 'options',
				options: [
					{
						name: 'Debit Card',
						value: 'debitCard',
					},
					{
						name: 'Credit Card',
						value: 'creditCard',
					},
				],
				default: 'debitCard',
				description: 'Filter by payment method',
			},
			{
				displayName: 'Payment Status',
				name: 'paymentStatus',
				type: 'options',
				options: [
					{
						name: 'Paid',
						value: 'paid',
					},
					{
						name: 'Unpaid',
						value: 'unpaid',
					},
				],
				default: 'paid',
				description: 'Filter by payment status',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Fulfilled',
						value: 'fulfilled',
					},
					{
						name: 'Unfulfilled',
						value: 'unfulfilled',
					},
				],
				default: 'fulfilled',
				description: 'Filter by order status',
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

export const fields: INodeProperties[] = [...productFields, ...orderFields];
