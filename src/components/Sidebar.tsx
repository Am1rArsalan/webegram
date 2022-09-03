import { useStore } from '../store';
import ChannelList from './ChannelList';
import Search from './Search';
import styles from './styles/Sidebar.module.css';
import DirectsList from './DirectsList';
import Profile from './Profile';
import { useNavigate } from '@solidjs/router';

function Sidebar() {
	const [_, { addToDirects }] = useStore();
	const nav = useNavigate();
	let popoverContainerRef;

	return (
		<div class={styles.Nav} ref={popoverContainerRef}>
			<Profile popoverContainerRef={popoverContainerRef} />
			<nav class={styles.ChannelNav}>
				<div class={styles.NavUserSearchbar}>
					<h3> rooms </h3>
				</div>
				<ChannelList />
				<br />
				<div class={styles.List}>
					<div class={styles.NavUserSearchbar}>
						<h3> users </h3>
						<Search
							action={(data) => {
								addToDirects(data.email, data._id);
								nav(`user/${data.email.split('@')[0]}`);
							}}
							containerRef={popoverContainerRef}
						/>
					</div>
					<DirectsList />
				</div>
			</nav>
		</div>
	);
}

export default Sidebar;
