import { Resolver, Query, Args } from '@nestjs/graphql';
import { AIService } from './services/ai.service';

@Resolver()
export class AIResolver {
    constructor(private readonly aiService: AIService) {}

    @Query(() => String)
    async askAI(@Args('query') query: string): Promise<string> {
        return this.aiService.askAI(query);
    }

    @Query(() => [[String]])
    async getChatHistory() {
        return this.aiService.getHistory();
    }
}
