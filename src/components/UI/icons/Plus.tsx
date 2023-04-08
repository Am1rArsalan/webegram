import { Component } from 'solid-js';
import { IconProps } from './IconProps';

export const Plus: Component<IconProps> = (props) => {
	const { width, height, fill, ...rest } = props;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 6 6"
			{...rest}
			width={width}
			height={height}
			fill={fill}
		>
			<path d="M3.75 0L2.25 0 2.25 2.25 0 2.25 0 3.75 2.25 3.75 2.25 6 3.75 6 3.75 3.75 6 3.75 6 2.25 3.75 2.25z" />
		</svg>
	);
};
