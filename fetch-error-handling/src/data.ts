import { FetchError, BadResponseError, HttpResponseError } from './errors';
import { Project } from './types';
const URL_API_JSON_SERVER = 'http://localhost:5001';
const REQUEST_URL = `${URL_API_JSON_SERVER}/projectss`; //qk01

// HAPPY PATH -----------------------------------------------------------------
export async function fetchProjectsHappyPath() {
	const projects = await getProjectsHappyPath();
	console.warn(`projects: `, projects); //LOG
}

export async function getProjectsHappyPath() {
	const res = await fetch(REQUEST_URL);
	console.warn(`res: `, res); //LOG

	// const data = await res.json(); // returns 'unknown' with ts-reset, otherwise any
	const data = (await res.json()) as Project[];
	console.warn(`data: `, data); //LOG

	return data;
}

// ERROR HANDLING -------------------------------------------------------------
export async function fetchProjectsErrorHandling() {
	const projects = await getProjectsErrorHandling().catch((err) => {
		console.warn(`FETCH: CATCH ERROR`); //LOG
		console.error(`err: `, err); //LOG
		console.info(`err.name: `, err.name); //LOG
		console.info(`err.message: `, err.message); //LOG
		console.info(`err.context: `, err?.context); //LOG
		console.info(`err.cause: `, err?.cause); //LOG
	});
	console.info(`projects: `, projects); //LOG
}

export async function getProjectsErrorHandling() {
	// 1: fetch can error if no connection is made
	const response = await fetch(REQUEST_URL).catch((err) => {
		console.warn(`GET: FETCH ERROR`); //LOG
		console.error(`err: `, err); //LOG
		throw new FetchError('Get Projects fetch failed', { cause: err });
	});
	console.info(`res: `, response); //LOG

	// 2: response can be bad - res.ok is not true (response.status != 2xx)
	// if (!response.ok) {
	// 	console.warn(`GET: response.ok ERROR`); //LOG
	// 	// console.info(`json: `, response.status); //LOG
	// 	// console.info(`json: `, response.statusText); //LOG
	// 	throw new BadResponseError('Get Projects bad fetch response', { response });
	// }

	// 3: if res.ok is true, res can have an HTTP error status code 4xx, 5xx
	if (response.status >= 400) {
		console.warn(`GET: http status ERROR`); //LOG

		// console.warn(`REQ Method: `, response.headers.get('content-type')); //LOG
		// response.headers.forEach((val, name) => console.info(`${name}: ${val}`));

		throw new HttpResponseError(
			response,
			{
				status: response.status,
				statusText: response.statusText,
				url: response.url,
				message: 'Get Projects http response error',
			},
			{ cause: response }
		);
	}

	// 4. parsing json can error with a SyntaxError
	const data = (await response.json()) as Project[];
	console.info(`data: `, data); //LOG

	return data;
}
