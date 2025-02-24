import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AIResolver } from './ai/ai.resolver';
import { AIService } from './ai/services/ai.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  providers: [AIResolver, AIService],
})
export class AppModule {}
