console.log('fe-direct-api');

const cloudinaryURL = `https://api.cloudinary.com/v1_1/techaloudsolutions/image/upload`;
const formUpload = document.querySelector('#form-fe-direct-api');

formUpload.addEventListener('submit', (event) => {
	event.preventDefault();

	const image = document.querySelector('[type=file]').files;
	console.info(`image: `, image); //LOG

	const formData = new FormData();
	formData.append('file', image[0]);
	formData.append('upload_preset', 'tas_unsigned');
	formData.append('folder', 'demo');

	fetch(cloudinaryURL, {
		method: 'POST',
		body: formData,
	})
		.then((response) => response.json())
		.then((data) => {
			console.info(`data: `, data); //LOG
		});
});
