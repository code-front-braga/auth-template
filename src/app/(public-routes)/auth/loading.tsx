'use client';

import { FidgetSpinner } from 'react-loader-spinner';

export default function Loading() {
	return (
		<div className="m-auto">
			<FidgetSpinner
				visible={true}
				height="80"
				width="80"
				ariaLabel="fidget-spinner-loading"
				wrapperStyle={{}}
				wrapperClass="fidget-spinner-wrapper"
				backgroundColor="#fafafa"
				ballColors={['#7f22fe', '#7f22fe', '#7f22fe']}
			/>
		</div>
	);
}
