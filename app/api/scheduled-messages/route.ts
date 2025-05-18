// app/api/scheduled-messages/route.ts
import { NextResponse } from "next/server";
import { cancelScheduledMessage, scheduleMessage, scheduleRecurringMessage } from "@/lib/services/agenda-service";

export async function POST(req: Request) {
  console.log('logELian llegue POST')
  const data = await req.json();
  const { id, type, scheduledDate, recurrencePattern, recurrenceDays = [], active } = data;

  if (type === "one-time" && scheduledDate) {
    await scheduleMessage(id, new Date(scheduledDate));
  } else if (type === "recurring" && recurrencePattern) {
    await scheduleRecurringMessage(id, recurrencePattern, recurrenceDays);
  }
  return NextResponse.json({ success: true });
}

export async function PATCH(req: Request) {
  console.log('logELian llegue path')
  const data = await req.json();
  const { id, type, scheduledDate, recurrencePattern, recurrenceDays = [], active } = data;

  await cancelScheduledMessage(id);

  if (active) {
    if (type === "one-time" && scheduledDate) {
      await scheduleMessage(id, new Date(scheduledDate));
    } else if (type === "recurring" && recurrencePattern) {
      await scheduleRecurringMessage(id, recurrencePattern, recurrenceDays);
    }
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  console.log('logELian llegue')
  const data = await req.json();
  const { id } = data;

  await cancelScheduledMessage(id);

  return NextResponse.json({ success: true });
}