export type SocketSignalType = {
	connectionStatus: boolean;
	isTyping: boolean;
	onlineUsers: {
		[key: string]: string[];
	};
};
