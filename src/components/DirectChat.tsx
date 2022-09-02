import { useParams } from 'solid-app-router';
import { createEffect, onCleanup, onMount, Show } from 'solid-js';
import styles from './styles/Chat.module.css';
import MessagesList from './MessagesList';
import ChatInputForm from './ChatInputForm';
import { useStore } from '../store';
import { MessageType } from '../types/message';

function DirectChat() {
	const params = useParams();
	const [store, { sendMessage, updateIsTypingEvent, updateSelectedDirect, resetIsTypingEvent }] = useStore();

	function fetchMessages() {
		const directUserEmail = `${params.email}@gmail.com`;
		const direct = store.directs.get(directUserEmail);
		if (direct) {
			return direct.chats;
		}

		return new Map<string, MessageType[]>();
	}

	createEffect(() => {
		updateSelectedDirect(`${params.email}@gmail.com`);
	});

	onCleanup(() => {
		updateSelectedDirect();
		resetIsTypingEvent();
	});

	return (
		<div class={[styles.ChatContainer, 'text-3xl'].join(' ')}>
			<div class={styles.ChatMain}>
				<div class={styles.ChatInfo}>
					<div class={styles.ChannelName}>#{`${params.email}@gmail.com`}</div>
				</div>
				<div class={styles.Messages} id="ChatMain">
					<div class={styles.EndOfMessages}>{"That's every message!"}</div>
					<Show when={store.directs.get(`${params.email}@gmail.com`)} fallback="loading...">
						<MessagesList messages={fetchMessages()} />
					</Show>
				</div>
				<ChatInputForm
					handleIsTypingEvent={() => updateIsTypingEvent('DC')}
					sendMessage={(content) => params.email && sendMessage(content, params.email)}
				>
					<Show when={store.socket.isTyping}>
						<span>typing...</span>
					</Show>
				</ChatInputForm>
			</div>
		</div>
	);
}

export default DirectChat;
