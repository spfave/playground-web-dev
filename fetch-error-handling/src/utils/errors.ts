export class FetchError extends Error {
	name = FetchError.name;

	constructor(message: string = 'Fetch failed', options?: ErrorOptions) {
		super(message, options);
	}
}

type BadResponseErrorContext = { response?: Response };
export class BadResponseError extends Error {
	readonly name = BadResponseError.name;

	// Constructor parameter prefixes auto create class property with name and value
	// Ref: https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties
	constructor(
		message: string = 'Bad fetch response',
		readonly context?: BadResponseErrorContext,
		options?: ErrorOptions
	) {
		super(message, options);
	}
}

type HttpResponseErrorContext = {
	status?: number;
	statusText?: string;
	url?: string;
	message?: string;
};
export class HttpResponseError extends Error {
	readonly name = HttpResponseError.name;

	constructor(
		response: Response,
		readonly context?: HttpResponseErrorContext,
		options?: ErrorOptions
	) {
		const defaultMsg = `${response.status} (${response.statusText}) request ${response.url}`;
		const message = context?.message ? `${context.message} - ${defaultMsg}` : defaultMsg;
		super(message, options);
	}
}
