import { createEffect, onCleanup, onMount, Show } from 'solid-js';
import { useParams } from '@solidjs/router';
import ChatInputForm from './ChatInputForm';
import Members from './Members';
import MessagesList from './MessagesList';
import styles from './styles/Chat.module.css';
import { useStore } from '../store';
import { MessageType } from '../types/message';

function Channel() {
	const params = useParams();
	const [
		store,
		{ sendChannelMessage, joinRoom, updateIsTypingEvent, updateSelectedChannel, resetIsTypingEvent },
	] = useStore();
	let chatScrollContainer: HTMLDivElement | undefined;

	onMount(() => {
		updateSelectedChannel(params.slug);

		// FIXMe: this should be map not array
		const channel = store.rooms.find((c) => c.slug === params.slug);
		if (!channel) return;

		joinRoom(channel._id);
	});

	onCleanup(() => {
		updateSelectedChannel();
		resetIsTypingEvent();
	});

	createEffect(() => {
		if (chatScrollContainer && params.slug) {
			chatScrollContainer.scrollTop = chatScrollContainer.scrollHeight;
		}
	});

	function fetchMessages() {
		const channel = store.rooms.find((item) => item.slug == params.slug);

		if (channel) {
			return channel.chats;
		}

		return new Map<string, MessageType[]>();
	}

	return (
		<div class={styles.ChatContainer}>
			<div class={styles.ChatMain}>
				<div class={styles.ChatInfo}>
					<div class={styles.ChannelName}>#{params.slug}</div>
				</div>
				<div class={styles.Messages} ref={chatScrollContainer}>
					<div class={styles.EndOfMessages}>{"That's every message!"}</div>
					<Show when={store.rooms.find((item) => item.slug == params.slug)}>
						<MessagesList messages={fetchMessages()} />
					</Show>
				</div>
				<ChatInputForm
					handleIsTypingEvent={() => updateIsTypingEvent('GP')}
					sendMessage={(content) => {
						params.slug && sendChannelMessage(content, params.slug);
						if (chatScrollContainer) {
							chatScrollContainer.scrollTop = chatScrollContainer.scrollHeight;
						}
					}}
				>
					<Show when={store.socket.isTyping}>
						<span>typing...</span>
					</Show>
				</ChatInputForm>
			</div>
			<Members slug={params.slug} />
		</div>
	);
}

export default Channel;
