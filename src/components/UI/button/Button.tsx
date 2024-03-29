import { Component, mergeProps, splitProps } from 'solid-js';
import styles from './Button.module.css';
import { classNames } from '../utils/classNames';
import { ElementType, HtmlProps } from '../../../types/helper';

export type ButtonProps<C extends ElementType = 'button'> = HtmlProps<C>;

export function Button(props: ButtonProps) {
	const { children } = props;

	const propsWithDefault: ButtonProps<'button'> = mergeProps(props);
	const [local, _, others] = splitProps(propsWithDefault, ['class', 'disabled'], ['children']);

	const classes = () => {
		return classNames(styles.Button, local.class);
	};

	return (
		<button class={classes()} {...others}>
			{children}
		</button>
	);
}
