import { For } from 'solid-js';
import { NavLink } from '@solidjs/router';
import { useStore } from '../store';
import styles from './styles/Sidebar.module.css';

function ChannelList() {
	const [store, { updateSelectedChannel, joinRoom }] = useStore();
	return (
		<For each={store.rooms}>
			{(room) => (
				<NavLink
					class={styles.ChanelLink}
					activeClass={styles.ActiveLink}
					href={`/channel/${room.slug}`}
					replace={true}
					onClick={() => {
						updateSelectedChannel(room.slug);
						joinRoom(room._id);
					}}
				>
					# {room.name}
				</NavLink>
			)}
		</For>
	);
}

export default ChannelList;
