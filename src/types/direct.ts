import { CreateDirectDto } from "../dtos/Direct";

export type DirectType = {
  _id: string;
  from: {
    _id: string;
    displayName: string;
    email: string;
    image: string;
  };
  to: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export function newDirect(data: CreateDirectDto): DirectType {
  return {
    _id: "Pending",
    from: {
      _id: data.userId,
      displayName: data.displayName,
      email: data.email,
      image: data.image,
    },
    to: data.to,
    content: data.content,
    created_at: data.creationTime,
    updated_at: data.creationTime,
  };
}
