import Resizer from "react-image-file-resizer";
import React, { useState } from "react";
function App() {
	const [data, setData] = useState("");
	const compress = 80;
	const fileFormat = "JPEG";
	const rotationDegree = 0; // degree of clockwise rotation to apply to uploaded image.
	const resizeFile = (file, height, width) =>
		new Promise((resolve) => {
			Resizer.imageFileResizer(
				file,
				width,
				height,
				fileFormat,
				compress,
				rotationDegree,
				(uri) => {
					resolve(uri);
				},
				"base64"
			);
		});

	const onChange = async (event) => {
		try {
			let _URL = window.URL || window.webkitURL;
			let img = new Image();
			const file = event.target.files[0];
			let height, width;

			let objectUrl = _URL.createObjectURL(file);
			img.onload = function () {
				height = this.height;
				width = this.width;
				_URL.revokeObjectURL(objectUrl);
			};
			console.log("file", file);
			const image = await resizeFile(file, height, width);
			img.src = objectUrl;

			console.log(image);
			setData(image);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<div>
				<input type="file" onChange={onChange} />
				<img src={data} />
			</div>
		</>
	);
}

export default App;
