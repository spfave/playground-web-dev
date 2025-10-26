// Ref: https://code.visualstudio.com/docs/debugtest/debugging
// Ref: https://code.visualstudio.com/docs/debugtest/debugging-configuration

// Ref: https://code.visualstudio.com/docs/nodejs/browser-debugging
// Ref: https://code.visualstudio.com/docs/nodejs/nodejs-debugging
// Ref: https://code.visualstudio.com/docs/nodejs/nodejs-tutorial#_debug-your-express-app

// Ref: https://code.visualstudio.com/docs/typescript/typescript-debugging
// Ref: https://code.visualstudio.com/docs/typescript/typescript-tutorial?originUrl=%2Fdocs%2Ftypescript%2Ftypescript-compiling

function addTS(a: number, b: number) {
	return a + b;
}

debugger;
console.info(`DEBUG SCRIPT TS`); // LOG
console.info(`addts(1,2): `, addTS(1, 2)); // LOG
console.info(`addts(5,-3): `, addTS(5, -3)); // LOG
