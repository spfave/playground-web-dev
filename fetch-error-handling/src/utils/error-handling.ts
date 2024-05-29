import { BadResponseError, FetchError, HttpResponseError } from './errors';

/**
 * Stand-in logic for uniquely handling thrown errors. This should do something
 * more purposeful with the error and its details (message, context, cause, etc.)
 * - e.g. submit error to logging service, treat uniquely as desired
 */
export function handleFetchError(err: unknown) {
	if (err instanceof FetchError) {
		return err.message;
	} else if (err instanceof BadResponseError) {
		return err.message;
	} else if (err instanceof HttpResponseError) {
		return handleHttpResponseError(err);
	} else if (err instanceof SyntaxError) {
		return err.message;
	} else {
		return getErrorMessage(err);
	}
}

export function handleHttpResponseError(err: HttpResponseError) {
	if (!err.context?.message) return err.message;

	const status = err.context.status;
	if (status === 404) return err.message;
	else if (status === 500) return err.message;
	// ...
	else return err.message;
}

export function getErrorMessage(err: unknown) {
	if (typeof err === 'string') return err;
	if (
		err &&
		typeof err === 'object' &&
		'message' in err &&
		typeof err.message === 'string'
	) {
		return err.message;
	}
	console.error('Unable to get error message for error', err);
	return 'Unknown Error';
}
