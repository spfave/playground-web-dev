import { getProjectsHappyPath } from "../data";

// ATTEMPT ASYNC/PROMISE HELPER
async function attempt<TPromise>(
	asyncFn: (...args: any[]) => Promise<TPromise>,
	// promise: Promise<TPromise>, // same TS inference on return type
	catchFn = (_err: unknown) => {},
	finallyFn = () => {}
) {
	let value;
	let exception;

	try {
		value = await asyncFn();
		// value = await promise;
	} catch (err) {
		exception = err;
		value = catchFn(err);
	} finally {
		finallyFn();
	}

	return { value, exception };
}

async function handleAttempt() {
	const result = await attempt(() => getProjectsHappyPath());
	// const result = await attempt(getProjectsHappyPath());

	if (result.exception) {
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
