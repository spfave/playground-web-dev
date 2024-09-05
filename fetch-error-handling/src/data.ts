import { FetchError, FetchResponseError, HttpResponseError } from "./utils/errors";
import { handleFetchError } from "./utils/error-handling";
import { settledArray } from "./utils/promise-settled";
import { Project } from "./utils/types";

const URL_API_JSON_SERVER = "http://localhost:5001";
const REQUEST_URL = `${URL_API_JSON_SERVER}/projects`; //qk01

// HAPPY PATH -----------------------------------------------------------------
export async function fetchProjectsHappyPath() {
	const projects = await getProjectsHappyPath();
	console.info(`projects: `, projects); //LOG
}

export class GetProjectsError extends Error {
	constructor(message: string = "Get Projects Error", options?: ErrorOptions) {
		super(message, options);
	}
}
export async function getProjectsHappyPath() {
	const response = await fetch(REQUEST_URL);
	console.warn(`response: `, response); //LOG

	// const data = await response.json(); // returns 'unknown' with ts-reset, otherwise any
	const data = (await response.json()) as Project[];
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

		handleFetchError(err); // handle specific error thrown from getProjectER function
		// showClientErrorMsg(err); // handle error at a higher level to communicate error simply to client/user
	});
	console.info(`projects: `, projects); //LOG
}

export async function getProjectsErrorHandling() {
	// 1: fetch can error if no connection is made
	const response = await fetch(REQUEST_URL).catch((err) => {
		console.warn(`GET: fetch ERROR`); //LOG
		console.error(`err: `, err); //LOG
		throw new FetchError("Get Projects fetch failed", { cause: err });
		// return; | Promise.reject();
		// return alone will cause catch fn to return void but doesn't break code execution
		// return a promise rejection will break code execution
	});
	console.info(`response: `, response); //LOG

	// 2: response can not be ok - response.ok is false (response.status != 2xx)
	if (!response.ok) {
		console.warn(`GET: response.ok ERROR`); //LOG
		throw new FetchResponseError("Get Projects fetch response not ok", { response });
	}

	// 3: if response.ok is true, response can have an HTTP error status code 4xx, 5xx
	if (response.status >= 400) {
		console.warn(`GET: http status ERROR`); //LOG

		// console.warn(`REQ Method: `, response.headers.get('content-type')); //LOG
		// response.headers.forEach((val, name) => console.info(`${name}: ${val}`));

		throw new HttpResponseError(response, "Get Projects http response error");
	}

	// 4. parsing json can error with a SyntaxError
	const json = (await response.json()) as Project[];
	console.info(`json: `, json); //LOG

	return json;
}

// USING promise settled() helper ---------------------------------------------
export async function getProjectsSettledErrorHandling() {
	// 1: fetch can error if no connection is made
	const [err, response] = await settledArray(fetch(REQUEST_URL));
	if (err != null) {
		throw new FetchError("Get Projects fetch failed", { cause: err });
		// return; | Promise.reject(); // return alone will break code execution
	}

	// 2: response can not be ok
	if (!response.ok)
		throw new FetchResponseError("Get Projects fetch response not ok", { response });

	// 3: response can have an HTTP error status code 4xx, 5xx
	if (response.status >= 400) throw new HttpResponseError(response);

	// 4. parsing json can error with a SyntaxError
	// const [err2, json] = await settledArray(response.json()); // can't assert json data type inline
	const json = (await response.json()) as Project[];

	return json;
}
