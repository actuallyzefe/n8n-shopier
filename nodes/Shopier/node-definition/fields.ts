import { INodeProperties } from 'n8n-workflow';

import { productFields } from './fields/product.fields';
import { orderFields } from './fields/order.fields';

export const fields: INodeProperties[] = [...productFields, ...orderFields];
