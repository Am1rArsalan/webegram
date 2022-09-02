import { NavLink } from 'solid-app-router';
import { For } from 'solid-js';
import { useStore } from '../store';
import styles from './styles/UsersList.module.css';
import { classNames } from './UI/utils/classNames';
import UserInfo from './UserInfo';

function DirectsList() {
	const [store] = useStore();

	return (
		<ul class={styles.DirectsList}>
			<For each={Array.from(store.directs.values())}>
				{(direct) => {
					return (
						<NavLink
							activeClass={styles.ActiveDirectChat}
							class={styles.DirectChat}
							href={`/user/${direct.receiver.email.split('@')[0]}`}
						>
							<UserInfo
								//isOnline={}
								displayName={direct.receiver.displayName}
								image={direct.receiver.image}
							>
								<span
									class={classNames(
										styles.UserStatus,
										store.socket.onlineUsers[direct.receiver._id] ? styles.online : styles.offline
									)}
								/>
								<span class={styles.UserInfoEmail}>{direct.receiver.email}</span>
							</UserInfo>
						</NavLink>
					);
				}}
			</For>
		</ul>
	);
}

export default DirectsList;
