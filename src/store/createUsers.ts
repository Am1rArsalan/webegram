import { createResource, createSignal } from 'solid-js';
import { Actions } from '.';
import { UsersAgent } from './agent/users-agent/UsersAgent';
import { debounce } from '../utils';
import { StoreType } from '../types/store';

export interface UsersActions {
	updateSearchQuery(query: string): void;
	resetSearchedUsers(): void;
}

export default function createUsers(state: StoreType, actions: Actions, agent: UsersAgent) {
	const [query, setQuery] = createSignal('');
	const [users, { mutate }] = createResource(query, async () => {
		const searchQuery = query();
		return searchQuery.length ? await agent.fetchUsers(query()) : [];
	});

	Object.assign<Actions, UsersActions>(actions, {
		updateSearchQuery: debounce((query: string) => {
			setQuery(query);
		}, 300),
		resetSearchedUsers: () => mutate([]),
	});

	return users;
}
