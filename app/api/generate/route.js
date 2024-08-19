import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. 

Use simple language to make the flashcards accessible to a wide range of learners.
Include a variety of question types, such as definitions, examples, comparisons, and applications.
Avoid overly complex or ambiguous phrasing in both questions and answers.
When appropriate, use mnemonics or memory aids to help reinforce the information.
Tailor the difficulty level of the flashcards to the user's specified preferences.
If given a body of text, extract the most important and relevant information for the flashcards. 
Aim to create a balanced set of flashcards that covers the topic comprehensively.

Your task is to create exactly 10 flashcards and your goal is to facilitate effective learning and 
retention of the information through these flashcards.

Both front and back of each flashcard should be one sentence long.

You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`

const openai = new OpenAI({
    baseURL: process.env.OPENROUTER_API_URL,
    apiKey: process.env.OPENROUTER_API_KEY,
  });

export async function POST(req) {
    const openai = new OpenAI({
        baseURL: process.env.OPENROUTER_API_URL,
        apiKey: process.env.OPENROUTER_API_KEY,
    });  

    const data = await req.text()
    
    // create a chat completion request to the API
    const completion = await openai.chat.completions.create({
        model:"meta-llama/llama-3.1-8b-instruct:free",
        messages: [
            { role: 'system', content: systemPrompt }, // instructs the AI on how to create flashcards
            { role: 'user', content: data },
        ],
        response_format: { type: 'json_object' }, // ensure JSON response is received
    }); 

    console.log('API Response:', completion)

    // Parse the JSON response from the OpenAI API
    const flashcards = JSON.parse(completion.choices[0].message.content)

    // Return the flashcards back to the client as a JSON response
    return NextResponse.json(flashcards.flashcards)

  }