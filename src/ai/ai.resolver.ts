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
        const apiKey = process.env.HUGGINGFACE_API_KEY as string;
        const modelUrl = process.env.HUGGINGFACE_MODEL_URL as string;
        const modelName = process.env.HUGGINGFACE_MODEL_NAME as string;
        const maxTokens = Number(process.env.HUGGINGFACE_MAX_TOKENS);
        const stream = process.env.HUGGINGFACE_STREAM === "true";

        const response = await firstValueFrom(
            this.httpService.post(
                modelUrl,
                {
                    model: modelName,
                    messages: [{ role: "user", content: query }],
                    max_tokens: maxTokens,
                    stream: stream
                },
                { headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" } }
            )
        );

        // Extrahiere den Text
        const reply = response.data.choices[0]?.message?.content || "Fehler: Keine Antwort erhalten.";

        console.log("API RESPONSE:", response.data);
        console.log("Extracted Reply:", reply);

        return reply;
    }
}
