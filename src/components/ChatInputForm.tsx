import { createSignal, ParentProps } from 'solid-js';
import styles from './styles/ChatInputForm.module.css';

type Props = {
	sendMessage(content: string): void;
	handleIsTypingEvent(): void;
};

function ChatInputForm(props: ParentProps<Props>) {
	const [message, setMessage] = createSignal('');
	// TODO: fix this type

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
			<input
				value={message()}
				onChange={onChange}
				onInput={() => props.handleIsTypingEvent()}
				class={styles.ChatInput}
				placeholder="Message #general"
			/>
			{props.children}
		</form>
	);
}

export function scrollToEndOfList() {
	const chatContainer = document.querySelector('#ChatMain');
	if (chatContainer) {
		chatContainer.scrollTop = chatContainer.scrollHeight;
	}
}

export default ChatInputForm;
