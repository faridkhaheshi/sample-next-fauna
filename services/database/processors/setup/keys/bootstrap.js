import { CreateKey, Role } from "./../../../../../adapters/fauna";

export const createBootstrapKey = (client) =>
  client.query(CreateKey({ role: Role("keyrole_bootstrapUser") }));
