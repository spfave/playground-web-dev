// ERROR OR RESULT --------------------------------------------------------------------------------
function tryErrorResult() {
	const num = Math.random();
	return num < 0.5 ? new Error("Random number too low") : num;
}

const result = tryErrorResult();
if (result instanceof Error) console.log(result.message);
else console.log(result);
console.log(result);

// FAILURE OR SUCCESS -----------------------------------------------------------------------------
// Ref: https://twitter.com/mattpocockuk/status/1824437662515614176
//      https://twitter.com/mattpocockuk/status/1633064377518628866

// export type Failure<T> = { ok: false; error: T };
// export type Success<T> = { ok: true; value: T };
export interface Failure<T> {
	ok: false;
	error: T;
}
export interface Success<T> {
	ok: true;
	value: T;
}

export function Failure<T>(error: T): Failure<T> {
	return { ok: false, error };
}
export function Success<T>(value: T): Success<T> {
	return { ok: true, value };
}

function tryFailureSuccess() {
	const num = Math.random();
	// return num < 0.5 ? failure(new Error("Random number to low")) : success(num);
	if (num < 0.25) return Failure("Random number way too low");
	if (num < 0.5) return Failure(new Error("Random number too low"));
	if (num < 0.75) return Failure(75);
	return Success(num);
}

const result2 = tryFailureSuccess();
// if (!result2.success) console.log(result2.error.message);
// else console.log(result2.value);
// console.log(result2);
if (!result2.ok) {
	console.log(result2);
	if (result2.error instanceof Error) console.log(result2.error.message);
	if (typeof result2.error === "string") console.log(result2.error);
	if (typeof result2.error === "number") console.log(result2.error);
} else console.log(result2.value);
console.log(result2);

const tmp: Failure<string> = { ok: false, error: "" };
