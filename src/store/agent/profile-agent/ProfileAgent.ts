import { ProfileType } from '../../../types/profile';
import { BaseAgentImpl } from '../BaseAgent';

export interface ProfileAgent {
	fetchProfile(): Promise<ProfileType | undefined>;
	logout(): Promise<void>;
}

export class ProfileAgentImpl extends BaseAgentImpl implements ProfileAgent {
	constructor(token: string | null, onError: () => void) {
		super(token, onError);
	}

	fetchProfile() {
		return this.createFetchHttpRequest<ProfileType>('GET', '/user', 'data');
	}

	logout(): Promise<void> {
		return this.createFetchHttpRequest('GET', '/auth/logout', 'data');
	}
}
