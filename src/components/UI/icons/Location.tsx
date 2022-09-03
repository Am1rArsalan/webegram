import { IconProps } from './IconProps';

function Location(props: IconProps) {
	const { width, height, fill, ...rest } = props;
	return (
		<svg viewBox="0 0 16 17" width={width} height={height} fill={fill} {...rest}>
			<path
				d="M8 0C4.1 0 1 3.1 1 7c0 1.9.7 3.7 2.1 5 .1.1 4.1 3.7 4.2 3.8.4.3 1 .3 1.3 0 .1-.1 4.2-3.7 4.2-3.8 1.4-1.3 2.1-3.1 2.1-5 .1-3.9-3-7-6.9-7zm0 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
				fill-rule="nonzero"
			/>
		</svg>
	);
}

export default Location;
