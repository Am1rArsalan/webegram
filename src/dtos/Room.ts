export type CreateRoomDto = {
	name: string;
	slug: string;
};

export type AddMemberDto = {
	memberId: string;
	roomSlug: string;
	memberName: string;
};
