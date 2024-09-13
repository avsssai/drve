import { db } from "~/auth/db.server";

const users = [
  {
    email: "shiva@email.com",
    passwordHash:
      "$2a$10$Cx6JtrVqzDTw0gS9TMdOfu2MVZbQbSOsg73MQGdl6UlP8oudv1hF6",
    dob: "1995-06-19T00:00:00.000Z",
    role: "ADMIN",
  },
  {
    email: "abc@email.com",
    passwordHash:
      "$2a$10$Cx6JtrVqzDTw0gS9TMdOfu2MVZbQbSOsg73MQGdl6UlP8oudv1hF6",
    dob: "1995-06-19T00:00:00.000Z",
  },
];

async function seed() {
  const createUser = async (user: {
    email: string;
    passwordHash: string;
    dob: string;
  }) => {
    return await db.user.create({ data: user });
  };
  return Promise.all(users.map(async (user) => await createUser(user)));
}

seed();
