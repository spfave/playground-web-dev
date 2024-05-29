import { getProjectsHappyPath } from "../data";
import { NonNullish } from "./types";

// ATTEMPT ASYNC/PROMISE HELPER
async function attempt<TPromise>(
	// asyncFn: (...args: any[]) => Promise<TPromise>,
	promise: Promise<TPromise>, // same TS inference on return type
	catchFn = (_err: unknown): any => {},
	finallyFn = () => {}
) {
	let value;
	let exception;

	/**
	 * For rejected case define error as '{}: non-nullish' type to get desired TS inference of a returned
	 * discriminated union and desired type narrowing through an if check.
	 * If natively inferred as 'any' or asserted as 'unknown' TS does not narrow type through an if check.
	 * Since the error could be any/unknown (rejected) or undefined (fulfilled), and an any/unknown type
	 * could be undefined.
	 * Alternately need to define/assert return type on function/return to get desired TS inference.
	 */
	try {
		// value = await asyncFn();
		value = await promise;
		return { exception: undefined, value } as const;
	} catch (err) {
		exception = err;
		value = catchFn(err);
		return { exception: exception as NonNullish, value } as const;
	} finally {
		finallyFn();
	}

	// return { value, exception };
}

async function handleAttempt() {
	// const result = await attempt(() => getProjectsHappyPath());
	const result = await attempt(getProjectsHappyPath());

	if (result.exception != null) {
		const exc = result.exception; // not null | undefined or non-false value?
		const val = result.value;
		throw exc;
	} else {
		const exc = result.exception;
		const val = result.value;
	}
	const exc = result.exception;
	const val = result.value;
}
