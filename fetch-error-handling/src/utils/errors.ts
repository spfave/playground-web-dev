export class FetchError extends Error {
	readonly name = FetchError.name;

	constructor(message: string = "Fetch failed", options?: ErrorOptions) {
		super(message, options);
	}
}

// type FetchResponseErrorContext = { response?: Response };
export class FetchResponseError extends Error {
	readonly name = FetchResponseError.name;
	// readonly context?: FetchResponseErrorContext;

	// Constructor parameter prefixes auto create class property with name and value
	// Ref: https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties
	constructor(
		message: string = "Fetch response not ok",
		// context?: FetchResponseErrorContext,
		options?: ErrorOptions
	) {
		super(message, options);
		// this.context = context;
	}
}

type HttpResponseErrorContext = {
	status: number;
	statusText: string;
	url: string;
	message?: string;
};
export class HttpResponseError extends Error {
	readonly name = HttpResponseError.name;
	readonly context: HttpResponseErrorContext;

	constructor(response: Response, message?: string, options?: ErrorOptions) {
		const defaultMsg = `${response.status} (${response.statusText}) request ${response.url}`;
		const errMsg = message ? `${message} - ${defaultMsg}` : defaultMsg;

		super(errMsg, options);
		this.context = {
			status: response.status,
			statusText: response.statusText,
			url: response.url,
			message,
		};
	}
}
