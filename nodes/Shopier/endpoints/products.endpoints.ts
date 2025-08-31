export const PRODUCTS_ENDPOINTS = {
	GET_MANY: '/products',
	GET_BY_ID: '/products/{id}',
};

export const buildGetProductByIdEndpoint = (id: string) => {
	return PRODUCTS_ENDPOINTS.GET_BY_ID.replace('{id}', id);
};
