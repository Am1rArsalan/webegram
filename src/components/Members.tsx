import { classNames } from './UI/utils/classNames';
import styles from './styles/Members.module.css';
import Search from './Search';
import { For, ParentProps, Show } from 'solid-js';
import { useStore } from '../store';

function Member(props: ParentProps<{ memberId: string }>) {
	const [store] = useStore();

	return (
		<div class={styles.Member}>
			<div
				class={classNames(
					styles.MemberStatus,
					store.socket.onlineUsers[props.memberId] ? styles.online : styles.offline
				)}
			/>
			{props.children}
		</div>
	);
}

function Members(props: { slug: string }) {
	const [store, { addMember }] = useStore();
	let containerRef;

	function getRoomMembers() {
		const roomIndex = store.rooms.findIndex((room) => room.slug === props.slug);
		if (roomIndex == -1) {
			return [];
		}

		const room = store.rooms[roomIndex];
		return room.members;
	}

	function checkAdmin(userId?: string) {
		return userId === store.rooms[store.rooms.findIndex((room) => room.slug === props.slug)]?.admin;
	}

	return (
		<div class={styles.Members} ref={containerRef}>
			<div>
				<Show when={checkAdmin(store.profile?._id)}>
					<h5>add member form</h5>
					<Search
						action={(data) =>
							addMember({
								memberId: data._id,
								roomSlug: props.slug,
								memberName: data.displayName,
							})
						}
						containerRef={containerRef}
					/>
				</Show>
			</div>
			<div>
				<h5 style={{ 'margin-bottom': '.5rem' }}> members : </h5>
				<For each={getRoomMembers()}>
					{(member) => {
						return (
							<Member memberId={member._id}>
								{member.displayName} {checkAdmin(member._id) && '(admin)'}
							</Member>
						);
					}}
				</For>
			</div>
		</div>
	);
}

export default Members;
