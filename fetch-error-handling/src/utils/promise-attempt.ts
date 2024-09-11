import { GetProjectsError, getProjectsHappyPath } from "../data";
import { Failure, Success } from "./try-failure-success";
import { NonNullish, Project } from "./types";

// ATTEMPT ASYNC/PROMISE HELPER
// Ref: https://github.com/open-draft/until/blob/main/src/until.ts

// TS CONST -----------------------------------------------------------------------------
export async function attempt<TPromise>(
	asyncFunc: (...args: any[]) => Promise<TPromise>,
	// promise: Promise<TPromise>, // same TS inference on return type
	catchFunc = (_err: unknown): any => {},
	finallyFunc = () => {}
) {
	let value;
	let error;

	/**
	 * For rejected case define error as '{}: non-nullish' type to get desired TS inference of a returned
	 * discriminated union and desired type narrowing through an if check.
	 * If natively inferred as 'any' or asserted as 'unknown' TS does not narrow type through an if check.
	 * Since the error could be any/unknown (rejected) or undefined (fulfilled), and an any/unknown type
	 * could be undefined.
	 * Alternately need to define/assert return type on function/return to get desired TS inference.
	 */
	try {
		value = await asyncFunc().catch((err) => {
			throw err;
		});
		// value = await promise;
		return { error: null, value } as const;
	} catch (err) {
		error = err;
		value = catchFunc(err);
		return { error: err as NonNullish, value } as const;
	} finally {
		finallyFunc();
	}

	// return { value, error };
}

async function handleAttempt() {
	const result = await attempt(() => getProjectsHappyPath());
	// const result = await attempt(getProjectsHappyPath());

	if (result.error != null) {
		const err = result.error; // not null | undefined or non-false value?
		const val = result.value;
		throw err;
	} else {
		const err = result.error;
		const val = result.value;
	}
	const err = result.error;
	const val = result.value;
}

// FAILURE/SUCCESS ----------------------------------------------------------------------
// alt name: safeAttempt, [safeAsync], safeUntil
export async function attemptFailureSuccess<
	TError extends any = unknown,
	TPromise extends any = unknown
>(
	asyncFunc: () => Promise<TPromise>,
	catchFunc = (_err: unknown) => {},
	finallyFunc = () => {}
): Promise<Failure<TError> | Success<TPromise>> {
	try {
		const value = await asyncFunc().catch((err) => {
			throw err;
		});
		return Success(value);
	} catch (err) {
		catchFunc(err);
		return Failure(err as TError);
	} finally {
		finallyFunc();
	}
}

async function handleAttemptFailureSuccess() {
	// const result = await attemptFailureSuccess(() => getProjectsHappyPath());
	const result = await attemptFailureSuccess<GetProjectsError, Project[]>(() =>
		getProjectsHappyPath()
	);

	if (!result.ok) {
		const err = result.error; // not null | undefined or non-false value?
		// const val = result.value;
		throw err;
	} else {
		// const err = result.error;
		const val = result.value;
	}
	// const err = result.error;
	const val = result.value;
}
