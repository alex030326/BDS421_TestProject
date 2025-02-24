import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AIService {
    private messages: { userQuery: string; aiResponse: string }[] = [];

    constructor(private readonly httpService: HttpService) {}

    async askAI(query: string): Promise<string> {
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

        const reply = response.data.choices[0]?.message?.content || "Fehler: Keine Antwort erhalten.";

        // Speichert Anfrage und Antwort im Speicher
        this.messages.push({ userQuery: query, aiResponse: reply });
        if (this.messages.length > 10) {
            this.messages.shift();
        }

        console.log("API RESPONSE:", response.data);
        console.log("Extracted Reply:", reply);

        return reply;
    }

    getHistory(): string[][] {
        return this.messages.map(msg => [msg.userQuery, msg.aiResponse]);
    }

}
