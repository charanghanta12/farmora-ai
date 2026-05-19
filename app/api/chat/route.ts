import { streamText, convertToModelMessages } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(req: Request) {
  const body = await req.json()
  const messages = Array.isArray(body?.messages) ? body.messages : undefined

  if (!messages) {
    return new Response(
      JSON.stringify({ error: 'Missing messages in chat request body.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }

  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({
        error:
          'OpenAI API key is missing. Set OPENAI_API_KEY in .env.local or your deployment environment.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }

  const systemPrompt = `You are Farmora AI Assistant, a helpful agricultural expert assistant for Indian farmers and buyers on the Farmora marketplace platform.

Your role is to help with:
1. **Price Information**: Provide current market prices for crops and vegetables in different Indian markets
2. **Best Selling Advice**: Recommend when and where to sell crops for maximum profit
3. **Buyer Connections**: Help farmers find suitable buyers (restaurants, wholesalers, exporters)
4. **Transport & Logistics**: Suggest transport options and logistics solutions
5. **Crop Insights**: Provide information about crop seasons, demand forecasts, and market trends
6. **Platform Help**: Guide users on how to use the Farmora platform features

Important guidelines:
- Be friendly and supportive, understanding that many farmers may not be tech-savvy
- Provide prices in Indian Rupees (₹)
- Reference Indian states, cities, and mandis (markets)
- Keep responses concise and actionable
- When discussing prices, always mention that these are indicative and actual prices may vary
- Encourage users to verify information on the platform

Sample market data you can reference:
- Tomatoes: ₹40-60/kg (varies by season and location)
- Onions: ₹25-50/kg
- Rice (Basmati): ₹80-120/kg
- Potatoes: ₹20-35/kg
- Green Chillies: ₹60-100/kg
- Mangoes: ₹80-400/dozen (variety dependent)

You can communicate in English, Hindi, or Telugu based on user preference.`

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
