import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { join } from 'path';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { JwtModule } from './jwt/jwt.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { AuthModule } from './auth/auth.module';
import { Verification } from './users/entities/verification.entity';
import { MailModule } from './mail/mail.module';
import { CommonModule } from './common/common.module';
import { Context } from 'apollo-server-core';
import { UploadsModule } from './uploads/uploads.module';
import { VillagersModule } from './villagers/villagers.module';
import { Villager } from './villagers/entities/villager';
import { VillagerComment } from './villagers/entities/villager-comment';
import { Creature } from './creatures/entities/creature.entity';
import { CreaturesModule } from './creatures/creatures.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === "production",
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('dev', 'production')
          .required(),
        DB_HOST: Joi.string(),
        DB_PORT: Joi.string(),
        DB_USERNAME: Joi.string(),
        DB_PASSWORD: Joi.string(),
        DB_DATABASE: Joi.string(),
        PRIVATE_KEY: Joi.string().required(),
        SENDGRID_API_KEY: Joi.string().required(),
        SENDGRID_FROM_EMAIL: Joi.string().required(),
        SENDGRID_FROM_URL: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...(process.env.DATABASE_URL
      ? { url: process.env.DATABASE_URL }
      : {
          host: process.env.DB_HOST,
          port: +process.env.DB_PORT,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
        }),
      synchronize: true,
      entities: [User, Verification, Villager, VillagerComment, Creature]
    }),
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        subscriptions: {
          'graphql-ws': {
            onConnect: (context: Context<any>) => {
              const { connectionParams, extra } = context;
              extra.token = connectionParams['x-jwt'];
            },
          },
          // 'subscriptions-transport-ws': {
          //   onConnect: (connectionParams: any) => ({
          //     token: connectionParams['x-jwt'],
          //   }),
          // },
        },
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        playground: process.env.NODE_ENV !== 'production',
        context: ({ req, extra }) => {
          if (extra) {
            return { token: extra.token };
          } else {
            return { token: req.headers['x-jwt'] };
          }
        },
        cache: "bounded"
      }),
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY
    }),
    MailModule.forRoot({
      apiKey: process.env.SENDGRID_API_KEY,
      fromMail: process.env.SENDGRID_FROM_EMAIL,
      url: process.env.SENDGRID_FROM_URL,
    }), 
    UsersModule,
    CommonModule,
    AuthModule,
    UploadsModule,
    VillagersModule,
    CreaturesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  /* 
  * 1. token??? request??? ??????
  * 2. request??? JwtMiddleware??? ?????? ?????? ???
  * 3. JwtMiddleware??? token??? ?????? request user??? ?????????
  * 4. request??? Graphql??? ?????? context????????? ?????????
  * 5. context??? ??? request?????? ???????????? ???????????? context??? ?????? ????????? HTTP request property??? ?????????
  * 6. resolver??? context??? ?????? ??????  
  */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: '/graphql', method: RequestMethod.ALL });
  }
}
