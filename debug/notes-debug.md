# DEBUG Configuration Notes
**References:**  
General VS Code Debugging
- https://code.visualstudio.com/docs/debugtest/debugging
- https://code.visualstudio.com/docs/debugtest/debugging-configuration

Javascript/Node.js
- https://code.visualstudio.com/docs/nodejs/browser-debugging
- https://code.visualstudio.com/docs/nodejs/nodejs-debugging
- https://code.visualstudio.com/docs/nodejs/nodejs-tutorial#_debug-your-express-app

Typescript
- https://code.visualstudio.com/docs/typescript/typescript-debugging
- https://code.visualstudio.com/docs/typescript/typescript-tutorial?originUrl=%2Fdocs%2Ftypescript%2Ftypescript-compiling#_debugging

Edge DevTools Extension
- https://learn.microsoft.com/en-us/microsoft-edge/visual-studio-code/microsoft-edge-devtools-extension


## Browser Configs
```json
{
	"configurations": [
		// 1. Open with Edge: right-click html file and select "Open Browser"/"Open Browser with DevTools"
		// Opens html file in VSCode embedded browser tab, optionally with devtools open in a tab. Does not auto reload with code change
		// For debugging web app (html) that does not require running on a web server


		// 2. Launch Instance: from browser devtools extension
		// Open embedded browser inside VSCode. Specify file url or web url in browser address bar. Does not attach debugger to local source code files
		// For when debugging is not needed


		// 3 Launch Configuration
		// For debugging web app that requires running on a web server

		// 3a. Launch file: Opens file in dedicated browser. Does not auto reload. Equivalent to "Open with Edge". Prefer "Open with Edge"
		{
			"name": "Web via Edge: File",
			"request": "launch",
			"type": "msedge",
			"runtimeArgs": ["--headless"], // prevent opening dedicated browser window
			"file": "${workspaceFolder}/debug/index.html"
		},

		// 3b. Launch url: Opens url in dedicated browser. Use with a running server (e.g.live server extension) to provide auto reload
		{
			"name": "Web via Edge",
			"request": "launch",
			"type": "msedge",
			"runtimeArgs": ["--headless", "--remote-debugging-port=9055"], // specify debug port
			"url": "http://localhost:5500/debug",
			// "webRoot": "${workspaceFolder}/debug" // for source map resolution, serving files from diff directory than source file, or using web framework
		},

		// 3c. Attach browser devtools. Attaches devtools to debug browser 
		{
			"name": "DevTools Attach",
			"request": "attach",
			"type": "vscode-edge-devtools.debug",
			"port": 9055,
			"url":"http://localhost:5500/debug"
		},
	]
}
```


## Runtime (Node.js) Script/Application Configs

```json
{
	"configurations": [
		// 1. "F5": Press "F5" key to launch 


		// 2. Auto Attach: Turn on setting "Auto Attach" then run in terminal, optionally with "--inspect" as needed


		// 3. Launch Profiles
		// 3a. Launch JS nodejs program in debug mode
		{
			"name": "JS Script",
			"request": "launch",
			"type": "node",
			"program": "${workspaceFolder}/debug/debug.js",
			"skipFiles": ["**/<node_internals>/**"]
		},

		// 3b. Launch JS nodejs program through an npm script in debug mode
		{
			"name": "JS Script via NPM",
			"request": "launch",
			"type": "node",
			"cwd": "${workspaceFolder}/debug",
			"runtimeArgs": ["run-script", "runjs"],
			"runtimeExecutable": "npm",
			"skipFiles": ["**/<node_internals>/**"]
		},

		// 3c. Launch TS nodejs program in debug mode. Possible with nodejs native TS run support
		{
			"name": "TS Script",
			"request": "launch",
			"type": "node",
			"program": "${workspaceFolder}/debug/debug.ts",
			"skipFiles": ["**/<node_internals>/**"]
		}
	]
}
```