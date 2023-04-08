import { ParentProps } from 'solid-js';
import styles from './styles/Message.module.css';
import { classNames } from './UI/utils/classNames';

type MessageWithAvatarProps = {
	username?: string;
	image?: string;
	disabled?: boolean;
	createdAt: string;
};

export function MessageWithAvatar({
	children,
	username,
	image,
	createdAt,
	disabled = false,
}: ParentProps<MessageWithAvatarProps>) {
	// TODO : add default avatar for non existence of the profile pic
	return (
		<div class={classNames(styles.Message, styles.withAvatar)}>
			<img referrerpolicy="no-referrer" class={styles.Avatar} src={image || 'https://i.pravatar.cc/300'} />
			<div class={styles.Author}>
				<div>
					<span class={styles.UserName}>{username || ''}</span>
					<span class={styles.TimeStamp}>{createdAt}</span>
				</div>
				<div aria-disabled={`${disabled}`} class={styles.MessageContent}>
					{children}
				</div>
				{disabled && 'DISABLED'}
			</div>
		</div>
	);
}

type MessageWithoutAvatarProps = {
	disabled?: boolean;
};

export function MessageWithoutAvatar({ children }: ParentProps<MessageWithoutAvatarProps>) {
	return (
		<div class={classNames(styles.Message, styles.noAvatar)}>
			<div class={styles.MessageContent}>{children}</div>
		</div>
	);
}
