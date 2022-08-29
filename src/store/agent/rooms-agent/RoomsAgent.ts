import { AddMemberDto, CreateRoomDto } from "../../../dtos/Room";
import { RoomType } from "../../../types/rooms";
import { BaseAgentImpl } from "../BaseAgent";

export interface RoomsAgent {
  createRoom(data: CreateRoomDto): Promise<RoomType>;
  fetchRooms(): Promise<RoomType[] | undefined>;
  addMember(data: AddMemberDto): Promise<string>;
}

export class RoomsAgentImpl extends BaseAgentImpl implements RoomsAgent {
  constructor(token: string | null, onError: () => void) {
    super(token, onError);
  }

  fetchRooms() {
    return this.createFetchHttpRequest<RoomType[]>("GET", `/room`, "data");
  }

  addMember({ memberId, roomSlug, memberName }: AddMemberDto) {
    return this.createHttpRequest<AddMemberDto>(
      "PUT",
      "/room/member/add",
      { roomSlug, memberId, memberName },
      "data"
    );
  }

  createRoom(data: CreateRoomDto) {
    return this.createHttpRequest<CreateRoomDto>(
      "POST",
      `/room/create`,
      data,
      "data"
    );
  }
}
