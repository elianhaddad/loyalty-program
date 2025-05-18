// app/api/scheduled-messages/route.ts
import { NextResponse } from "next/server";
// import { cancelScheduledMessage, scheduleMessage, scheduleRecurringMessage } from "@/lib/services/agenda-service";

export async function POST(req: Request) {
  const data = await req.json();
  const {
    id,
    type,
    scheduledDate,
    recurrencePattern,
    recurrenceDays = [],
    active,
  } = data;

  // if (type === "one-time" && scheduledDate) {
  //   await scheduleMessage(id, new Date(scheduledDate));
  // } else if (type === "recurring" && recurrencePattern) {
  //   await scheduleRecurringMessage(id, recurrencePattern, recurrenceDays);
  // }
  return NextResponse.json({ success: true });
}
