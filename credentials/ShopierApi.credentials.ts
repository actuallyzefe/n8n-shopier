import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ShopierApi implements ICredentialType {
	name = 'shopierApi';

	displayName = 'Shopier API';

	documentationUrl = 'https://developer.shopier.com/reference';

	icon = 'file:shopier.svg' as const;

	properties: INodeProperties[] = [
		{
			displayName: 'Personal Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'The Personal Access Token for authenticating with Shopier API',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.shopier.com',
			url: '/v1/products',
			method: 'GET',
		},
	};
}
