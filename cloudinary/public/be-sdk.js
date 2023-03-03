console.log('be-sdk');

const serverUploadUrl = `/api/be-sdk`;
const formUpload = document.querySelector('#form-be-sdk');

formUpload.addEventListener('submit', (event) => {
	event.preventDefault();

	const image = document.querySelector('[type=file]').files[0];
	console.info(`image: `, image); //LOG

	const formData = new FormData();
	formData.append('file', image);

	fetch(serverUploadUrl, {
		method: 'POST',
		body: formData,
	})
		.then((response) => {
			console.info(`response: `, response); //LOG
			return response.json();
		})
		.then((data) => {
			console.info(`data: `, data); //LOG
		});
});
