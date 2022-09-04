import { createSignal, ParentProps } from 'solid-js';
import styles from './styles/ChatInputForm.module.css';
//import { IconButton } from './UI/button';

type Props = {
	sendMessage(content: string): void;
	handleIsTypingEvent(): void;
};

function ChatInputForm(props: ParentProps<Props>) {
	const [message, setMessage] = createSignal('');

	function handleSend(ev: Event) {
		ev.preventDefault();
		if (message().length === 0) return;
		props.sendMessage(message());
		setMessage('');
	}

	function onChange(ev: Event) {
		//@ts-ignore
		setMessage(ev.currentTarget.value);
	}

	return (
		<form class={styles.ChatInputBox} onSubmit={handleSend}>
			<div class={styles.ChatInputWrapper}>
				<input
					value={message()}
					onChange={onChange}
					onInput={() => props.handleIsTypingEvent()}
					class={styles.ChatInput}
					placeholder="Write your message"
				/>
				{/*	<IconButton>
					<Location fill={'#000'} width={30} height={30} />
				</IconButton>*/}
			</div>
			<div class={styles.ChatIsTypingWrapper}>{props.children}</div>
		</form>
	);
}

export default ChatInputForm;
