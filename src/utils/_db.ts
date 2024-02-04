import { PrismaClient } from "@prisma/client";

let _db: PrismaClient;

declare global {
  var db: PrismaClient | undefined;
}

if (!global.db) {
  global.db = new PrismaClient();
}

_db = global.db;

export { _db };
