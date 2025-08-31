export const ORDERS_ENDPOINTS = {
	GET_MANY: '/orders',
	GET_BY_ID: (id: string) => `/orders/${id}`,
	GET_TRANSACTION: (orderId: string) => `/orders/transactions/${orderId}`,
} as const;

export function buildGetOrderByIdEndpoint(orderId: string): string {
	return ORDERS_ENDPOINTS.GET_BY_ID(orderId);
}

export function buildGetOrderTransactionEndpoint(orderId: string): string {
	return ORDERS_ENDPOINTS.GET_TRANSACTION(orderId);
}
