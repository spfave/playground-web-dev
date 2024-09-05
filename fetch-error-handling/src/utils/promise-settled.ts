import { getProjectsHappyPath } from "../data";
import { NonNullish } from "./types";

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
	 * Since the error could be any/unknown (rejected) or null/undefined (fulfilled), and an any/unknown
	 * type could be null/undefined.
	 * Alternately need to define/assert return type on function/return to get desired TS inference.
	 */
	// return pSettled.status === "fulfilled" // ? 'fulfilled' : 'rejected'
	// 	? ({ error: null, value: pSettled.value } as const)
	// 	: ({ error: pSettled.reason as NonNullish, value: null } as const);
	// : ({ error: pSettled.reason as unknown, value: null } as const);

	// Method 2 - with defined/asserted return type
	// return pSettled.status === 'fulfilled'
	// 	? ({ error: false, value: pSettled.value } as const)
	// 	: ({ error: true, reason: pSettled.reason } as const); // satisfies SettledObject<TPromise> // same TS inference
	// return pSettled.status === 'fulfilled'
	// 	? ({ error: false, value: pSettled.value } as SettledObject<TPromise>)
	// 	: ({ error: true, reason: pSettled.reason } as SettledObject<TPromise>); // type assertion

	// Method 3 - with discriminator
	return pSettled.status === "fulfilled" // ? 'fulfilled' : 'rejected'
		? ({ complete: true, value: pSettled.value } as const)
		: ({ complete: false, error: pSettled.reason as unknown } as const);
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
	const err1a = result.error;
	const val1a = result.value;

	const { value, error } = await settledObject(getProjectsHappyPath()); // same results as non-destructuring
	if (error != null) {
		const err = error;
		const val = value;
		throw err;
	} else {
		const err = error;
		const val = value;
	}
	const err1b = error;
	const val1b = value;

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
	// const err2 = result.error;
	// const rsn2 = result.reason;
	// const val2 = result.value;

	// Method 3
	if (!result.complete) {
		const c = result.complete;
		const err = result.error;
		const val = result.value;
	} else {
		const c = result.complete;
		const err = result.error;
		const val = result.value;
	}
	const err3 = result.error;
	const val3 = result.value;
}

// ARRAY FORM -------------------------------------------------------------------------------------
export async function settledArray<TPromise>(promise: Promise<TPromise>) {
	const pSettled = (await Promise.allSettled([promise]))[0];

	/**
	 * For rejected case define error as '{}: non-nullish' type to get desired TS type narrowing inference.
	 * If natively inferred as 'any' or asserted as 'unknown' TS does not narrow type through an if check.
	 * Since the error could be any/unknown (rejected) or null/undefined (fulfilled), and an any/unknown
	 * type could be null/undefined.
	 */
	return pSettled.status === "fulfilled" // ? 'fulfilled' : 'rejected'
		? ([null, pSettled.value] as const)
		: ([pSettled.reason as NonNullish, null] as const);
	// : ([pSettled.reason as unknown, null] as const);
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
	const err2 = error;
	const val2 = value;
}
