export default defineEventHandler(() => {
	throw createError({
		statusCode: 404,
		statusMessage: 'Resource not found',
	});
});
