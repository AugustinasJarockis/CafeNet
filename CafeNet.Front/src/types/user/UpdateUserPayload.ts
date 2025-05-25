export type UpdateCurrentUserPayload = {
  name?: string;
  username?: string;
  password?: string;
  locationId?: number;
  phoneNumber?: string;
  version: string;
};

export type UpdateUserPayload = {
  name?: string;
  username?: string;
  locationId?: number;
  version: string;
};
