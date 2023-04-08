import { Component, mergeProps, splitProps } from 'solid-js';
import { ElementType, HtmlProps } from '../../../types/helper';
import { classNames } from '../utils/classNames';
import styles from './Input.module.css';

export type InputProps<C extends ElementType = 'input'> = HtmlProps<C>;

export const Input: Component<InputProps> = (props) => {
	const propsWithDefault: InputProps<'input'> = mergeProps(props);

	const [local, _, others] = splitProps(propsWithDefault, ['class', 'disabled'], ['children']);

	const classes = () => {
		return classNames(styles.Input, local.class);
	};

	return <input class={classes()} {...others} />;
};
