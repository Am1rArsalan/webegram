import dayjs from 'dayjs';
import { useParams } from '@solidjs/router';
import { For } from 'solid-js';
import { useStore } from '../store';
import { MessageType } from '../types/message';
import { UserType } from '../types/user';
import { MessageWithAvatar, MessageWithoutAvatar } from './Chat';
import styles from './styles/Chat.module.css';

function MessagesList(props: { messages: Map<string, MessageType[]> }) {
	const [store] = useStore();
	const params = useParams();

	function getChattingUser(from: string) {
		let chattingUser: UserType | undefined;
		const activeDirect = store.directs.get(`${params.email}@gmail.com`);
		if (params.email && activeDirect) {
			chattingUser = activeDirect.receiver;
		} else {
			chattingUser = store.rooms
				.find((room) => room.slug === params.slug)
				?.members.find((member) => member._id === from);
		}

		return chattingUser;
	}

	return (
		<For each={[...props.messages]}>
			{(messageGroup) => {
				const date = messageGroup[0];
				const messages = messageGroup[1];
				let previousMessage = '';
				return (
					<>
						<div>
							<div class={styles.Day}>
								<div class={styles.DayLine} />
								<div class={styles.DayText}>{date}</div>
								<div class={styles.DayLine} />
							</div>
						</div>
						<For each={messages}>
							{(message) => {
								let withoutAvatar = previousMessage === message.from;
								previousMessage = message.from;
								const profile = store.profile;
								if (!profile) return null;

								const chattingUser = getChattingUser(message.from);
								if (!chattingUser) return null;

								return withoutAvatar ? (
									<MessageWithoutAvatar>{message.content}</MessageWithoutAvatar>
								) : (
									<MessageWithAvatar
										image={chattingUser._id === message.from ? chattingUser.image : profile.image}
										username={
											chattingUser._id === message.from ? chattingUser.displayName : profile.displayName
										}
										createdAt={dayjs(message.created_at).format('HH:MM a')}
									>
										{message.content}
									</MessageWithAvatar>
								);
							}}
						</For>
					</>
				);
			}}
		</For>
	);
}

export default MessagesList;
