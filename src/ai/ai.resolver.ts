import { Resolver, Query, Args } from '@nestjs/graphql';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';

dotenv.config();

@Resolver()
export class AIResolver {
    constructor(private readonly httpService: HttpService) {}

    @Query(() => String)
    async askAI(@Args('query') query: string): Promise<string> {
        const apiKey = process.env.HUGGINGFACE_API_KEY;
        const modelUrl = "https://router.huggingface.co/novita/v1/chat/completions";

        const response = await firstValueFrom(
            this.httpService.post(
                modelUrl,
                {
                    model: "mistralai/mistral-7b-instruct",
                    messages: [{ role: "user", content: query }],
                    max_tokens: 500,
                    stream: false
                },
                { headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" } }
            )
        );

//Extrahiere den Text
        const reply = response.data.choices[0]?.message?.content || "Fehler: Keine Antwort erhalten.";

        console.log("API RESPONSE:", response.data);
        console.log("Extracted Reply:", reply);

        return reply;

    }
}
