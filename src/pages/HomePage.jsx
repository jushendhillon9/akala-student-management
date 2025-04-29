import React from 'react';
import PlatformGif from '../assets/PlatfromGif.gif'

function HomePage() {
	return (
		<h1 className = "homepageOuter">
			<div className = "homepageInner">
				<div className = "homepageHeader">Student Management Platform</div>
				<div className = "linebreak"></div>
				<img className = "platformGif" src={PlatformGif} alt="Sample GIF" />
			</div>
		</h1>
	);
}

export default HomePage;