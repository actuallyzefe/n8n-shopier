import {
	IWebhookFunctions,
	IHookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	IDataObject,
	NodeOperationError,
	NodeConnectionType,
} from 'n8n-workflow';

export class ShopierTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Shopier Trigger',
		name: 'shopierTrigger',
		icon: 'file:shopier.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["events"].join(", ")}}',
		description: 'Handle Shopier webhook events',
		defaults: {
			name: 'Shopier Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'shopierApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				options: [
					{
						name: 'Order Address Updated',
						value: 'order.addressUpdated',
						description: 'When the buyer address is updated for an existing order',
					},
					{
						name: 'Order Created',
						value: 'order.created',
						description: 'When an order is created',
					},
					{
						name: 'Order Fulfilled',
						value: 'order.fulfilled',
						description:
							"When an existing order is fulfilled by the seller via seller's Shopier account and/or Shopier API",
					},
					{
						name: 'Product Created',
						value: 'product.created',
						description: "When a new product is listed via seller's Shopier account or Shopier API",
					},
					{
						name: 'Product Updated',
						value: 'product.updated',
						description:
							"When an existing product is updated via seller's Shopier account or Shopier API",
					},
					{
						name: 'Refund Requested',
						value: 'refund.requested',
						description:
							"When a new refund is requested by the seller via seller's Shopier account or Shopier API",
					},
					{
						name: 'Refund Updated',
						value: 'refund.updated',
						description: 'When a refund is either succeeded or failed',
					},
				],
				default: ['order.created'],
				required: true,
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				const webhookId = webhookData.webhookId as string;
				return !!webhookId;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				this.logger.info('Creating webhook');
				const originalUrl = this.getNodeWebhookUrl('default');
				const webhookUrl = `https://f3d7ea7146a7.ngrok-free.app${
					originalUrl?.replace(/^https?:\/\/[^\/]+/, '') || '/webhook'
				}`;

				this.logger.info('Webhook URL: ' + webhookUrl);
				const events = this.getNodeParameter('events') as string[];

				// Store webhook data for later use
				const webhookData = this.getWorkflowStaticData('node');
				webhookData.webhookUrl = webhookUrl;
				webhookData.events = events;

				// Note: In a real implementation, you would register this webhook URL
				// with Shopier's API. For now, we'll just store the data locally.
				webhookData.webhookId = `shopier-webhook-${Date.now()}`;

				this.logger.info('Webhook created');

				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				delete webhookData.webhookId;
				delete webhookData.webhookUrl;
				delete webhookData.events;
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const body = this.getBodyData() as IDataObject;
		const headers = this.getHeaderData() as IDataObject;
		const events = this.getNodeParameter('events') as string[];

		// Get webhook headers
		const shopierAccountId = headers['shopier-account-id'] as string;
		const shopierEvent = headers['shopier-event'] as string;
		const shopierWebhookId = headers['shopier-webhook-id'] as string;
		const shopierTimestamp = headers['shopier-timestamp'] as string;
		const shopierApiVersion = headers['shopier-api-version'] as string;

		// Check if this is an event we're listening for
		if (!events.includes(shopierEvent)) {
			throw new NodeOperationError(
				this.getNode(),
				`Event "${shopierEvent}" is not in the list of subscribed events: ${events.join(', ')}`,
			);
		}

		// Prepare the response data
		const responseData: IDataObject = {
			event: shopierEvent,
			accountId: shopierAccountId,
			webhookId: shopierWebhookId,
			timestamp: shopierTimestamp,
			apiVersion: shopierApiVersion,
			data: body,
		};

		// Return the webhook data
		return {
			workflowData: [
				[
					{
						json: responseData,
					},
				],
			],
		};
	}
}
