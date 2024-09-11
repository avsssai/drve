import { PrismaClient } from "@prisma/client";
import { singleton } from "~/utils/singleton.server";

export const db = singleton("prisma", () => new PrismaClient());
