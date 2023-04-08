import { UserType } from '../../../types/user';
import { BaseAgentImpl } from '../BaseAgent';

export interface UsersAgent {
	fetchUsers(query?: string): Promise<UserType[] | undefined>;
}

export class UsersAgentImpl extends BaseAgentImpl implements UsersAgent {
	constructor(token: string | null, onError: () => void) {
		super(token, onError);
	}

	fetchUsers(query: string) {
		return this.createFetchHttpRequest<UserType[]>('GET', `/user/search?search=${query}`, 'data');
	}
}
