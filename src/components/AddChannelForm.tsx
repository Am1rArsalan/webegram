import { createSignal } from 'solid-js';
import { useStore } from '../store';
import styles from './styles/AddChannelForm.module.css';
import { Button } from './UI/button';
import { Input } from './UI/input/Input';

function AddChannelForm(props: { closeForm: () => void }) {
	const [groupName, setGroupName] = createSignal('');
	const [groupSlug, setGroupSlug] = createSignal('');
	const [_, { createRoom }] = useStore();

	function onSubmit(ev: SubmitEvent) {
		ev.preventDefault();
		const slug = groupSlug();
		const name = groupName();
		if (name.length < 3) return;
		createRoom(name, slug.trim().replaceAll(/[ ]{1,}/g, '-'));
		props.closeForm();
	}

	return (
		<form class={styles.AddChannelForm} onSubmit={onSubmit}>
			<div>
				<Input
					class={styles.AddChannelFormInput}
					placeholder={'Type Group Name'}
					value={groupName()}
					onChange={(ev) => setGroupName(ev.currentTarget.value)}
				/>
			</div>
			<div>
				<Input
					class={styles.AddChannelFormInput}
					placeholder={'Type Group Slug'}
					value={groupSlug()}
					onChange={(ev) => setGroupSlug(ev.currentTarget.value)}
				/>
			</div>
			<Button class={styles.AddChannelFormSubmitButton} type="submit">
				Add Group
			</Button>
		</form>
	);
}

export default AddChannelForm;
