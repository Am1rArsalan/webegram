import { createSignal } from 'solid-js';
import { Actions } from '.';

export interface SelectedDirectActions {
	updateSelectedDirect(slug?: string): void;
}

export default function createSelectedDirects(actions: Actions) {
	const [selectedDirect, setSelectedDirect] = createSignal<string>();

	Object.assign<Actions, SelectedDirectActions>(actions, {
		updateSelectedDirect(slug) {
			setSelectedDirect(slug);
		},
	});

	return selectedDirect;
}
