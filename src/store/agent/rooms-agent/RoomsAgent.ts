import { CreateRoomDto } from "../../../dtos/Room";
import { RoomType } from "../../../types/rooms";
import { BaseAgentImpl } from "../BaseAgent";

export interface RoomsAgent {
  createRoom(data: CreateRoomDto): Promise<RoomType>;
}

export class RoomsAgentImpl extends BaseAgentImpl implements RoomsAgent {
  constructor(token: string | null, onError: () => void) {
    super(token, onError);
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
