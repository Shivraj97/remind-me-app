"use server";
import { currentUser } from "@clerk/nextjs";
import {
  createCollectionSchemaType,
} from "../schema/createCollection";
import { prisma } from "../lib/prisma";

export async function createCollection(format: createCollectionSchemaType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found!");
  }
  return await prisma.collection.create({
    data: {
      userId: user?.id,
      color: format.color,
      name: format.name,
    },
  });
}

export async function deleteCollection(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found!");
  }

  return await prisma.collection.delete({
    where: {
      id: id,
      userId: user?.id,
    },
  });
}
