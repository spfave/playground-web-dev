// @ts-check
// Ref: https://jsdoc.app/, https://www.youtube.com/watch?v=YK-GurROGIg

// ----------------------------------------------------------------------------------- //
// File

/**
 * @file Examples to demo generated docs from jsdoc comments
 * @author Sebastian F
 */

// ----------------------------------------------------------------------------------- //
// Constants, Objects, and Types

/**
 * Demo name
 * @type {string}
 */
const DEMO_NAME = "JSDoc Demo";

/**
 * Demo Name 2
 * @constant
 * @type {string}
 * @default
 */
const DEMO_NAME_2 = "JSDoc Demo 2";

/**
 * List of Mobile Suits
 * @type {Array<string>}
 */
const numbers = ["Wing Gundam", "Deathscythe", "Heavyarms", "Sandrock", "Shenlong"];

/**
 * Todo object
 * @type {{id: number | string, text: string}}
 */
const todo = { id: 1, text: "code" };

/**
 * Todo object
 * @typedef {Object} Todo
 * @property {number | string} id Todo unique ID
 * @property {string} text Todo text description
 * @property {boolean} complete Todo completion state
 * @property {string} [category="standard"] Todo category (optional)
 */

/** @type {Todo} */
const todoA = { id: 1, text: "code", complete: true };
/** @type {Todo} */
let todoB = { id: 1, text: "eat", complete: false, category: "priority" };

// ----------------------------------------------------------------------------------- //
// Functions

/**
 * Calculates the area of a rectangle given its dimensions
 *
 * @param {number} width Width of the rectangle
 * @param {number} height Height of the rectangle
 * @returns {number} Area of the rectangle
 */
function calcRectangleArea1(width, height) {
	return width * height;
}

/**
 * Calculates the area of a rectangle given its dimensions
 * @function
 * @name calcRectangleArea2___
 *
 * @param {number} width - Width of the rectangle
 * @param {number} height - Height of the rectangle
 * @returns {number} - Area of the rectangle
 *
 * @description Description: Calculates the area of a rectangle given its dimensions
 * @summary Summary: Calculates the area of a rectangle given its dimensions
 *
 * @example
 * calcRectangleArea2(4, 5); // returns 20
 */
export function calcRectangleArea2(width, height) {
	return width * height;
}

/**
 * Arrow Func: Calculates the area of a rectangle given its dimensions
 *
 * @param {number} width Width of the rectangle
 * @param {number} height Height of the rectangle
 * @returns {number} Area of the rectangle
 */
const calcRectangleArea_Arrow = (width, height) => {
	return width * height;
};

/**
 * Divides two numbers
 *
 * @param {number} a Dividend
 * @param {number} b Divisor
 * @returns {number} Quotient of a and b
 *
 * @throws {@link DivideByZeroError} If b is zero
 * @see DivideByZeroError
 */
function divide(a, b) {
	if (b === 0) {
		throw new Error("Cannot divide by zero");
	}
	return a / b;
}

/**
 * Download data from a specified URL.
 *
 * @async
 * @function
 * @name downloadData
 * @param {string} url - The URL to fetch from.
 * @return {Promise<unknown>} - The data from the URL.
 */
export async function downloadData(url) {
	return fetch(url).then((res) => res.json());
}

// ----------------------------------------------------------------------------------- //
// Classes

/**
 * Class defining DivideByZero Error
 * @class
 * @classdesc Class description: Further describing the DivideByZeroError
 * @extends Error
 */
export class DivideByZeroError extends Error {
	/** @property {string} name Error name */
	name = DivideByZeroError.name;

	/**
	 * Creates a DivideByZeroError instance
	 * @constructor
	 * @param {string} message Optional message to include in error
	 */
	constructor(message) {
		super(message);
	}

	/**
	 * @property {Function} getName Gets the error's name
	 * @returns {string} Error Name
	 */
	getName() {
		return this.name;
	}
}

/**
 * Class defining a person object
 */
class Person {
	/**
	 * Creates a Person instance
	 * @param {Object} personInfo Person's information
	 */
	constructor(personInfo) {
		/** @property {string} name Person's name */
		this.name = personInfo.name;
		/** @property {number} age Person's age */
		this.age = personInfo.age;
	}

	/**
	 * Logs person's greeting
	 * @method
	 * @returns {void}
	 */
	greet() {
		console.log(`Hello, my name is ${this.name} and I am ${this.age} years old`);
	}

	/**
	 * @property {Function} said Logs what person said
	 * @param {string} dialogue What person said
	 * @returns {void}
	 */
	said(dialogue) {
		console.log(`${this.name} said ${dialogue}`);
	}
}

/**
 * Person2 constructor description
 * @class
 * @classdesc Class desc: Person2 class description
 *
 * @property {string} name Person's name
 * @property {number} age Person's age
 *
 * @property {Function} greet Logs person's greeting
 * @property {Function} said Logs what person said
 */
class Person2 {
	// /** @property {string} name Person's name */
	// name;
	// /** @property {number} age Person's age */
	// age;

	/**
	 * Creates a Person instance
	 * @constructor
	 * @param {Object} personInfo Person's information
	 */
	constructor(personInfo) {
		this.name = personInfo.name;
		this.age = personInfo.age;
	}

	/**
	 * @returns {void}
	 */
	greet() {
		console.log(`Hello, my name is ${this.name} and I am ${this.age} years old`);
	}

	/**
	 * @param {string} dialogue What person said
	 * @returns {void}
	 */
	said(dialogue) {
		console.log(`${this.name} said ${dialogue}`);
	}
}

// /**
//  * Searches for a given string in an array of strings
//  *
//  * @param {string} query - The string to search for
//  * @param {string[]} strings - The array of strings to search in
//  * @returns {boolean} True if the query is found in the array, false otherwise
//  *
//  * @summary Short summary
//  * @description Override long description
//  *
//  * @example
//  * searchInArray("foo", ["foo", "bar", "baz"]); // returns true
//  */
// function searchInArray(query, strings) {
// 	return strings.includes(query);
// }

// /** Class representing a point. */
// class Point {
// 	/**
// 	 * Create a Point instance.
// 	 * @param {number} x - The x value.
// 	 * @param {number} y - The y value.
// 	 */
// 	constructor(x, y) {
// 		// ...
// 	}

// 	/**
// 	 * Get the x value.
// 	 * @return {number} The x value.
// 	 */
// 	getX() {
// 		// ...
// 	}

// 	/**
// 	 * Get the y value.
// 	 * @return {number} The y value.
// 	 */
// 	getY() {
// 		// ...
// 	}

// 	/**
// 	 * Convert a string containing two comma-separated numbers into a point.
// 	 * @param {string} str - The string containing two comma-separated numbers.
// 	 * @return {Point} A Point object.
// 	 */
// 	static fromString(str) {
// 		// ...
// 	}
// }

// /**
//  * Creates a new User
//  * @property {number} id - User Id
//  * @property {string} username - User username
//  * @method addTodo {Function} - Adds new todo
//  * @method getTodos {Function} - Retrieves all todos
//  */
// export default class User {
// 	id;
// 	username;
// 	#todos = []; // #todos is a private class member

// 	constructor(id, username) {
// 		this.id = id;
// 		this.username = username;
// 	}

// 	/**
// 	 * Used to add a new todo
// 	 * @param {Todo} todo New todo
// 	 * @returns {void} Void
// 	 */
// 	addTodo(todo) {
// 		this.#todos.push(todo);
// 	}

// 	/**
// 	 * Used to retrieve all todos
// 	 * @returns {Todo[]} Todos list
// 	 */
// 	getTodos() {
// 		return this.#todos;
// 	}
// }

/**
 * This is a description of the MyClass constructor function.
 *
 * @class
 * @classdesc This is a description of the MyClass class itself.
 */
export function MyClass() {}
