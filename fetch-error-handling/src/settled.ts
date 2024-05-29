import { getProjectsHappyPath } from './data';

// SETTLED PROMISE HELPER
// RETURN OBJECT ----------------------------------------------------------------------------------
type SettledObject<T> = { error: false; value: T } | { error: true; reason: unknown };

// async function settledObject<TPromise>(promise: Promise<TPromise>): Promise<SettledObject<TPromise>> {
async function settledObject<TPromise>(promise: Promise<TPromise>) {
	const pSettled = (await Promise.allSettled([promise]))[0];

	// Method 1
	// return pSettled.status === 'fulfilled' // ? 'fulfilled' : 'rejected'
	// 	? { error: undefined, value: pSettled.value }
	// 	: { error: pSettled.reason, value: undefined };

	// Method 2
	return pSettled.status === 'fulfilled'
		? ({ error: false, value: pSettled.value } as const) // satisfies SettledObject<TPromise> // same TS inference
		: ({ error: true, reason: pSettled.reason } as const);
	// return pSettled.status === 'fulfilled'
	// 	? ({ error: false, value: pSettled.value } as SettledObject<TPromise>)
	// 	: ({ error: true, reason: pSettled.reason } as SettledObject<TPromise>);
}

async function handleSettledObject() {
	const result = await settledObject(getProjectsHappyPath());

	// Method 1
	// - TS does not infer distinct types through if check on error value in result object
	// - Since the error could be any or undefined, and an any could be undefined.
	// if (result.error) {
	// 	const err = result.error;
	// 	const val = result.value;
	// 	throw err;
	// } else {
	// 	const err = result.error;
	// 	const val = result.value;
	// }

	// Method 2
	// - TS does not infer result as a discriminated union
	// - Need to define or assert return type on 'settledObject' to get discriminated union inference
	if (result.error) {
		const err = result.error;
		const rsn = result.reason;
		const val = result.value;
		throw err; // need to return or throw to get proper inference after if check scope
	} else {
		const err = result.error;
		const rsn = result.reason;
		const val = result.value;
	}
	const err = result.error;
	const rsn = result.reason;
	const val = result.value;

	// const { value, error } = await settledObject(getProjectsHappyPath()); // same results as non-destructuring
	// if (error) {
	// 	const err = error;
	// 	const val = value;
	// 	throw err;
	// } else {
	// 	const err = error;
	// 	const val = value;
	// }
}

// RETURN ARRAY -----------------------------------------------------------------------------------
async function settledArray<TPromise>(promise: Promise<TPromise>) {
	const pSettled = (await Promise.allSettled([promise]))[0];

	return pSettled.status === 'fulfilled' // ? 'fulfilled' : 'rejected'
		? ([undefined, pSettled.value] as const)
		: ([pSettled.reason as unknown, undefined] as const);
}

async function handleSettledArray() {
	const result = await settledArray(getProjectsHappyPath());

	// - TS does not infer distinct types through if check on error value (result[0]) in result tuple
	// - Since the error could be any or undefined, and an any could be undefined.
	if (result[0]) {
		const err = result[0]; // want as 'unknown'
		const val = result[1]; // want as 'undefined'/'never'
		throw err;
	} else {
		const err = result[0]; // want as 'undefined'/'never'
		const val = result[1]; // want as 'Project[]'
	}
	const err = result[0]; // want as never
	const val = result[1]; // want as 'Project[]'

	// const [error, value] = await settledArray(getProjectsHappyPath()); // same results as non-destructuring
	// if (error) {
	// 	const err = error;
	// 	const val = value;
	// 	return;
	// } else {
	// 	const err = error;
	// 	const val = value;
	// }
}
