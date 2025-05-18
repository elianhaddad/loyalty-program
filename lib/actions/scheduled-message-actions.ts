"use server";

import connectDB from "@/lib/db-server";
import ScheduledMessage from "../models/scheduled-message"
import type { IScheduledMessage } from "@/lib/models/scheduled-message";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers"; 

const BASE =
  process.env.NEXTAUTH_URL || // when deployed
  `http://localhost:${process.env.PORT ?? 3000}`;  // in dev

export async function getScheduledMessages() {
  await connectDB()
  const messages = await ScheduledMessage.find({}).sort({ createdAt: -1 })
  return JSON.parse(JSON.stringify(messages))
}

export async function getScheduledMessageById(id: string) {
  await connectDB()
  const message = await ScheduledMessage.findById(id)
  if (!message) return null
  return JSON.parse(JSON.stringify(message))
}

export async function createScheduledMessage(data: Partial<IScheduledMessage>) {
  await connectDB();
  const msg = await ScheduledMessage.create(data);
  const cookieHeader = (await headers()).get("cookie")!;
  // ➜ use absolute URL here
  await fetch(`${BASE}/api/scheduled-messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: cookieHeader,
    },
    body: JSON.stringify({
      id: msg._id,
      type: data.type,
      scheduledDate: data.scheduledDate,
      recurrencePattern: data.recurrencePattern,
      recurrenceDays: data.recurrenceDays,
      active: data.active,
    }),
  });

  revalidatePath("/configuration/scheduled-messages");
  return msg;
}

export async function updateScheduledMessage(id: string, data: Partial<IScheduledMessage>) {
  await connectDB();

  const cookieHeader = (await headers()).get("cookie")!;

  await ScheduledMessage.findByIdAndUpdate(id, data);

  await fetch(`${BASE}/api/scheduled-messages/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      cookie: cookieHeader,
    },
    body: JSON.stringify({
      id,
      type: data.type,
      scheduledDate: data.scheduledDate,
      recurrencePattern: data.recurrencePattern,
      recurrenceDays: data.recurrenceDays,
      active: data.active,
    }),
  });

  revalidatePath("/configuration/scheduled-messages");
}

export async function deleteScheduledMessage(id: string) {
  const cookieHeader = (await headers()).get("cookie")!;

  await fetch(`${BASE}/api/scheduled-messages/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      cookie: cookieHeader,
    },
    body: JSON.stringify({ id }),
  });
  revalidatePath("/configuration/scheduled-messages");
}

export async function toggleScheduledMessageActive(id: string, active: boolean) {
  await updateScheduledMessage(id, { active });
}