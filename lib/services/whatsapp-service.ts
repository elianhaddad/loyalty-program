import type { IClient } from "../models/client"
import type { IRedemptionOption } from "../models/redemption-option"

export async function sendWhatsAppMessage(to: string, message: string) {
  try {
    // En un entorno real, aquí se integraría con la API de WhatsApp Business
    // Por ahora, solo simularemos el envío
    console.log(`Sending WhatsApp message to ${to}: ${message}`)

    // Aquí iría la implementación real con la API de WhatsApp Business
    // Ejemplo:
    // const response = await fetch('https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     messaging_product: 'whatsapp',
    //     to: to,
    //     type: 'text',
    //     text: { body: message }
    //   }),
    // });
    // return response.json();

    return { success: true, message: "Message sent successfully (simulated)" }
  } catch (error) {
    console.error("Error sending WhatsApp message:", error)
    return { success: false, message: "Failed to send message" }
  }
}

export async function sendPurchaseNotification(
  client: IClient,
  points: number,
  availableRedemptions: IRedemptionOption[],
) {
  if (!client.whatsappSubscribed) {
    return { success: false, message: "Client is not subscribed to WhatsApp messages" }
  }

  let message = `¡Hola ${client.fullName}! Has ganado ${points} puntos en tu última compra. Ahora tienes un total de ${client.totalPoints} puntos.\n\n`

  if (availableRedemptions.length > 0) {
    message += "Canjes disponibles:\n"
    availableRedemptions.forEach((option) => {
      message += `- ${option.details} (${option.points} puntos)\n`
    })
    message += "\nPuedes canjear tus puntos en nuestra tienda. ¡Te esperamos!"
  } else {
    message += "Actualmente no hay canjes disponibles. ¡Sigue acumulando puntos!"
  }

  return sendWhatsAppMessage(client.phone, message)
}

export async function sendBroadcastMessage(clients: IClient[], message: string) {
  const results = []

  for (const client of clients) {
    if (client.whatsappSubscribed) {
      const result = await sendWhatsAppMessage(client.phone, message)
      results.push({ client: client._id, ...result })
    }
  }

  return results
}
