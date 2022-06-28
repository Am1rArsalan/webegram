export type DirectType = {
  _id: string;
  from: string;
  to: {
    _id: string;
    displayName: string;
    email: string;
  };
  content: string;
  created_at: string;
  updated_at: string;
};
