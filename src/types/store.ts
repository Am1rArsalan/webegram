import { DirectsType } from './directs';
import { ProfileType } from './profile';
import { RoomClientType } from './rooms';
import { SocketSignalType } from './socketSignal';
import { UserType } from './user';

export type StoreType = {
	readonly token: string | null;
	readonly profile: ProfileType | undefined;
	readonly users: UserType[];
	readonly rooms: RoomClientType[];
	readonly selectedChannel: string | undefined;
	readonly directs: DirectsType;
	readonly selectedDirect: string | undefined;
	readonly socket: SocketSignalType;
};
