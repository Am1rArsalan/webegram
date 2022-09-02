import { Accessor, createContext, useContext } from 'solid-js';
import { ParentProps, Resource } from 'solid-js';
import { createStore } from 'solid-js/store';
import { StoreType } from '../types/store';
import { ProfileType } from '../types/profile';
import createAgent from './createAgent';
import createProfile, { ProfileActions } from './createProfile';
import createUsers, { UsersActions } from './createUsers';
import { UserType } from '../types/user';
import { DirectsType } from '../types/directs';
import createDirects, { DirectsActions } from './createDirects';
import createSocketConnection, { SocketActions } from './createSocketConnection';
import { RoomClientType } from '../types/rooms';
import createRooms, { RoomActions } from './createRooms';
import { SocketSignalType } from '../types/socketSignal';
import createSelectedChannel, { SelectedChannelActions } from './createSelectedChannel';
import createSelectedDirects, { SelectedDirectActions } from './createSelectedDirect';

export type Actions = ProfileActions &
	UsersActions &
	DirectsActions &
	SocketActions &
	RoomActions &
	SelectedChannelActions &
	SelectedDirectActions;

export type StoreContextType = [StoreType, Actions];

const StoreContext = createContext<StoreContextType>([
	{
		token: '',
		profile: undefined,
		users: [],
		directs: new Map(),
		rooms: [],
		selectedDirect: undefined,
		selectedChannel: undefined,
		socket: {
			connectionStatus: false,
			isTyping: false,
		},
	},
	Object({}),
]);

export function Provider(props: ParentProps) {
	let profile: Resource<ProfileType | undefined>;
	let users: Resource<UserType[] | undefined>;
	let directs: Resource<DirectsType | undefined>;
	let selectedDirect: Accessor<string | undefined>;
	let selectedChannel: Accessor<string | undefined>;
	let rooms: Resource<RoomClientType[] | undefined>;
	let socketSignal: Accessor<SocketSignalType>;

	const queryParams = new URLSearchParams(location.search);
	if (!localStorage.getItem('token') && queryParams.get('token')) {
		localStorage.setItem('token', queryParams.get('token') as string);
		const newUrl = `${window.location.pathname}`;
		history.pushState({ path: newUrl }, '', newUrl);
	}

	const [state, setState] = createStore<StoreType>({
		token: localStorage.getItem('token'),
		get profile() {
			return profile();
		},
		get directs() {
			const directsData = directs();
			return directsData ? directsData : new Map();
		},
		get selectedDirect() {
			return selectedDirect();
		},
		get users() {
			const usersData = users();
			return usersData ? usersData : [];
		},
		get rooms() {
			const roomsData = rooms();
			return roomsData ? roomsData : [];
		},
		get selectedChannel() {
			return selectedChannel();
		},
		get socket() {
			const socketSignalData = socketSignal();
			return socketSignalData;
		},
	});

	// FIXME : remove as type casting and
	// fix ts warning on StoreContextType
	const actions: Actions = Object({});
	const store: StoreContextType = [state as StoreType, actions];
	const agent = createAgent(store);
	profile = createProfile(actions, agent.profile, setState);
	users = createUsers(state as StoreType, actions, agent.users);
	directs = createDirects(state as StoreType, actions, agent.directs);
	rooms = createRooms(state as StoreType, actions, agent.rooms);
	selectedChannel = createSelectedChannel(actions);
	selectedDirect = createSelectedDirects(actions);

	socketSignal = createSocketConnection(state as StoreType, actions);

	return <StoreContext.Provider value={store}>{props.children}</StoreContext.Provider>;
}

export function useStore() {
	const store = useContext(StoreContext);
	return store;
}
