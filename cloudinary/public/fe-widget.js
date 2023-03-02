console.log('fe-widget');

const cloudinaryWidget = cloudinary.createUploadWidget(
	{
		cloudName: 'techaloudsolutions',
		uploadPreset: 'tas_unsigned',
		folder: 'demo',
	},
	(error, data) => {
		if (!error && data && data.event === 'success') {
			console.log('data: ', data); //LOG;
			console.log('data.info: ', data.info); //LOG;
		}
	}
);

document
	.getElementById('btn-fe-widget')
	.addEventListener('click', () => cloudinaryWidget.open(), false);
