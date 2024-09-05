// ERROR OR RESULT --------------------------------------------------------------------------------
function randomNumberErrorResult() {
	const num = Math.random();
	return num < 0.5 ? new Error("Random number too low") : num;
}

const result = randomNumberErrorResult();
if (result instanceof Error) console.log(result.message);
else console.log(result);
console.log(result);

// FAILURE OR SUCCESS -----------------------------------------------------------------------------
// Ref: https://twitter.com/mattpocockuk/status/1824437662515614176

// - type or interface definition work the same
// export type Failure<T> = Readonly<{ ok: false; error: T }>;
// export type Success<T> = Readonly<{ ok: true; value: T }>;
export interface Failure<E> {
	readonly ok: false;
	readonly error: E;
}
export interface Success<T> {
	readonly ok: true;
	readonly value: T;
}

export function Failure<E>(error: E): Failure<E> {
	return { ok: false, error };
}
export function Success<T>(value: T): Success<T> {
	return { ok: true, value };
}

// - class definition requires use of new keyword on creation
// export class Failure<E> {
// 	readonly ok = false;
// 	constructor(readonly error: E) {}
// }
// export class Success<T> {
// 	readonly ok = true;
// 	constructor(readonly value: T) {}
// }

function randomNumberFailureSuccess() {
	const num = Math.random();
	// return num < 0.5 ? failure(new Error("Random number to low")) : success(num);
	if (num < 0.25) return Failure("Random number way too low");
	if (num < 0.5) return Failure(new Error("Random number too low"));
	if (num < 0.75) return Failure(75);
	return Success(num);
}

const result2 = randomNumberFailureSuccess();
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

// MAKE SAFE --------------------------------------------------------------------------------------
// Ref: https://twitter.com/mattpocockuk/status/1633064377518628866

export function makeSafe<TArgs extends any[], TReturn>(
	func: (...args: TArgs) => TReturn
) {
	return function (...args: TArgs): Failure<unknown> | Success<TReturn> {
		try {
			return Success(func(...args));
		} catch (err) {
			return Failure(err);
		}
	};
}

// const safeRandomNumber = makeSafe(randomNumberErrorResult)
// const safeRandomNumber = makeSafe(randomNumberFailureSuccess);
const safeRandomNumber = makeSafe(function () {
	const num = Math.random();
	if (num < 0.5) throw new Error("Random number too low");
	return num;
});
const result3 = safeRandomNumber();
if (!result3.ok) console.log(result3.error);
else console.log(result3.value);
