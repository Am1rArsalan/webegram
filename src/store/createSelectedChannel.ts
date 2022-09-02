import { createSignal } from 'solid-js';
import { Actions } from '.';

export interface SelectedChannelActions {
	updateSelectedChannel(slug?: string): void;
}

export default function createSelectedChannel(actions: Actions) {
	const [selectedChannel, setSelectedChannel] = createSignal<string>();

	Object.assign<Actions, SelectedChannelActions>(actions, {
		updateSelectedChannel(slug) {
			setSelectedChannel(slug);
		},
	});

	return selectedChannel;
}
