import { fetchProjectsHappyPath, fetchProjectsErrorHandling } from './data';

document
	.querySelector<HTMLButtonElement>('#getProjectsHappyPath')
	?.addEventListener('click', fetchProjectsHappyPath);

document
	.querySelector<HTMLButtonElement>('#getProjectsErrorHandling')
	?.addEventListener('click', fetchProjectsErrorHandling);

// window.addEventListener('error', (input) => {
// 	console.warn(`WINDOW: ON ERROR`); //LOG
// 	console.warn(`input: `, input); //LOG
// });
