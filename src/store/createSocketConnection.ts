import io from 'socket.io-client';
import { createSignal, onCleanup } from 'solid-js';
import { Actions } from '.';
import { SOCKET_URL } from '../constants/api';
import { DirectApiType } from '../types/directs';
import { StoreType } from '../types/store';

export interface SocketActions {
	resetSocketConnection(): void;
	sendMessage(content: string, to: string): void;
	sendChannelMessage(content: string, channelSlug: string): void;
	connectSocket(): void;
	emitNewDirect(data: { createdDirect: DirectApiType; userId: string }): void;
	joinRoom(roomId: string): void;
	joinSocket(): void;
	raiseIsTypingEvent(data: { target: string[]; isEnable: boolean; isDirect: boolean }): void;
	updateIsTypingEvent(context: 'DC' | 'GP'): void;
	resetIsTypingEvent(): void;
	getIsTypingTarget(isDirect: boolean): string[];
}

export default function createSocketConnection(state: StoreType, actions: Actions) {
	const socket = io(SOCKET_URL, {
		query: {
			token: state.token || '',
		},
	});
	let timeout: ReturnType<typeof setTimeout>;
	const [socketSignal, setSocketSignal] = createSignal({
		connectionStatus: socket.connected,
		isTyping: false,
		onlineUsers: {},
	});

	onCleanup(() => {
		if (timeout) clearTimeout(timeout);
	});

	socket.on('connect', () => {
		setSocketSignal({
			...socketSignal(),
			connectionStatus: true,
		});
	});

	socket.on('online', (data) => {
		setSocketSignal({
			...socketSignal(),
			onlineUsers: data,
		});
	});

	socket.on('offline', (data) => {
		setSocketSignal({
			...socketSignal(),
			onlineUsers: data,
		});
	});

	socket.on('session', (data) => {
		// @ts-ignore
		socket.userId = data.userId;
	});

	socket.on('disconnect', () => {
		setSocketSignal({
			...socketSignal(),
			connectionStatus: false,
		});
	});

	socket.on('direct:message-received', (createdMessage) => {
		console.log('direct:message-received');
		actions.addMessage(createdMessage);
	});

	socket.on('room:message-received', (data: any) => {
		actions.addRoomMessage(data);
	});

	socket.on('direct:message-failed', (message) => {
		// TODO
	});

	socket.on('direct:new', (data) => {
		actions.receiveDirect(data);
	});

	socket.on('isTyping', (data) => {
		if (!data.target) return;

		const isDirect = location.pathname.startsWith('/user');
		if (isDirect && data.target === state.selectedDirect) {
			setSocketSignal({
				...socketSignal(),
				isTyping: data.isEnable,
			});
			return;
		}

		if (data.target === state.selectedChannel) {
			setSocketSignal({
				...socketSignal(),
				isTyping: data.isEnable,
			});
		}
	});

	Object.assign<Actions, SocketActions>(actions, {
		resetSocketConnection() {
			socket.off('connect');
			socket.off('disconnect');
		},

		sendChannelMessage(content, channelSlug) {
			const room = state.rooms.find((room) => room.slug === channelSlug);
			if (!room) return;

			if (content.length > 0) {
				socket.emit('room:message-send', {
					from: state?.profile?._id,
					content,
					room,
				});
			}
		},

		sendMessage(content, to) {
			const direct = state.directs.get(`${to}@gmail.com`);
			if (!direct || content.length < 1) return;

			socket.emit('direct:message-send', {
				from: state?.profile?._id,
				to,
				content,
				room: direct._id,
			});
		},

		emitNewDirect(data) {
			socket.emit('direct:new', data);
		},

		connectSocket() {
			socket.connect();
		},

		joinRoom(roomId) {
			socket.emit('join:room', roomId);
		},

		joinSocket() {
			if (state.profile) {
				socket.emit('join', state.profile._id);
			}
		},

		resetIsTypingEvent() {
			setSocketSignal({
				...socketSignal(),
				isTyping: false,
			});

			if (timeout) clearTimeout(timeout);
		},

		getIsTypingTarget(isDirect) {
			let targetIds: string[] = [];
			if (isDirect && state.selectedDirect) {
				const direct = state.directs.get(state.selectedDirect);
				if (direct) {
					targetIds = [direct.receiver._id];
				}
			} else if (!isDirect && state.selectedChannel) {
				const room = state.rooms.find((room) => room.slug === state.selectedChannel);
				if (room) {
					//targetIds = room.members.map((m) => m._id);
					targetIds = [room._id];
				}
			}
			return targetIds;
		},

		updateIsTypingEvent(context) {
			const isDirect = context === 'DC';
			let target: string[] = actions.getIsTypingTarget(isDirect);

			if (!socketSignal().isTyping && target) {
				actions.raiseIsTypingEvent({ isEnable: true, target, isDirect });
				setSocketSignal({
					...socketSignal(),
					isTyping: true,
				});

				timeout && clearTimeout(timeout);
				timeout = setTimeout(() => {
					actions.raiseIsTypingEvent({ isEnable: false, target, isDirect });
					setSocketSignal({
						...socketSignal(),
						isTyping: false,
					});
				}, 1500);
			}
		},

		raiseIsTypingEvent(data) {
			if (data.isDirect && state.profile) {
				socket.emit('isTyping', {
					id: data.target,
					target: state.profile.email,
					isEnable: data.isEnable,
					isDirect: true,
				});
				return;
			}

			if (state.selectedChannel) {
				socket.emit('isTyping', {
					id: data.target,
					target: state.selectedChannel,
					isEnable: data.isEnable,
					isDirect: false,
				});
			}
			return;
		},
	});

	return socketSignal;
}
