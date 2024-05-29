import { getProjectsHappyPath } from '../data';
import { NonNullish } from './types';

// SETTLED PROMISE HELPER
// OBJECT FORM ------------------------------------------------------------------------------------
// type SettledObject<T> = { error: false; value: T } | { error: true; reason: unknown };
// async function settledObject<TPromise>(promise: Promise<TPromise>): Promise<SettledObject<TPromise>> {

export async function settledObject<TPromise>(promise: Promise<TPromise>) {
	const pSettled = (await Promise.allSettled([promise]))[0];

	// Method 1 -
	/**
	 * For rejected case define error as '{}: non-nullish' type to get desired TS inference of a returned
	 * discriminated union and desired type narrowing through an if check.
	 * If natively inferred as 'any' or asserted as 'unknown' TS does not narrow type through an if check.
	 * Since the error could be any/unknown (rejected) or undefined (fulfilled), and an any/unknown type
	 * could be undefined.
	 * Alternately need to define/assert return type on function/return to get desired TS inference.
	 */
	return pSettled.status === 'fulfilled' // ? 'fulfilled' : 'rejected'
		? ({ error: undefined, value: pSettled.value } as const)
		: ({ error: pSettled.reason as NonNullish, value: undefined } as const);
	// : ({ error: pSettled.reason as unknown, value: undefined } as const);

	// Method 2 - with defined/asserted return type
	// return pSettled.status === 'fulfilled'
	// 	? ({ error: false, value: pSettled.value } as const)
	// 	: ({ error: true, reason: pSettled.reason } as const); // satisfies SettledObject<TPromise> // same TS inference
	// return pSettled.status === 'fulfilled'
	// 	? ({ error: false, value: pSettled.value } as SettledObject<TPromise>)
	// 	: ({ error: true, reason: pSettled.reason } as SettledObject<TPromise>); // type assertion
}

async function handleSettledObject() {
	const result = await settledObject(getProjectsHappyPath());

	// Method 1
	if (result.error != null) {
		const err = result.error;
		const val = result.value;
		throw err; // need to return or throw to get proper inference after if check scope
	} else {
		const err = result.error;
		const val = result.value;
	}
	const err = result.error;
	const val = result.value;

	const { value, error } = await settledObject(getProjectsHappyPath()); // same results as non-destructuring
	if (error != null) {
		const err = error;
		const val = value;
		throw err;
	} else {
		const err = error;
		const val = value;
	}

	// Method 2
	// if (result.error) {
	// 	const err = result.error;
	// 	const rsn = result.reason;
	// 	const val = result.value;
	// 	throw err;
	// } else {
	// 	const err = result.error;
	// 	const rsn = result.reason;
	// 	const val = result.value;
	// }
	// const err = result.error;
	// const rsn = result.reason;
	// const val = result.value;
}

// ARRAY FORM -------------------------------------------------------------------------------------
export async function settledArray<TPromise>(promise: Promise<TPromise>) {
	const pSettled = (await Promise.allSettled([promise]))[0];

	/**
	 * For rejected case define error as '{}: non-nullish' type to get desired TS type narrowing inference.
	 * If natively inferred as 'any' or asserted as 'unknown' TS does not narrow type through an if check.
	 * Since the error could be any/unknown (rejected) or undefined (fulfilled), and an any/unknown type
	 * could be undefined.
	 */
	return pSettled.status === 'fulfilled' // ? 'fulfilled' : 'rejected'
		? ([undefined, pSettled.value] as const)
		: ([pSettled.reason as NonNullish, undefined] as const);
	// : ([pSettled.reason as unknown, undefined] as const);
}

async function handleSettledArray() {
	const result = await settledArray(getProjectsHappyPath());

	if (result[0] != null) {
		const err = result[0];
		const val = result[1];
		throw err; // need to return or throw to get proper inference after if check scope
	} else {
		const err = result[0];
		const val = result[1];
	}
	const err = result[0];
	const val = result[1];

	const [error, value] = await settledArray(getProjectsHappyPath()); // same results as non-destructuring
	if (error != null) {
		const err = error;
		const val = value;
		return;
	} else {
		const err = error;
		const val = value;
	}
}
