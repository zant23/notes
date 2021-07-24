import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {NotesModule} from "./notes/notes.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import configuration from "./config/configuration";
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [NotesModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
      ServeStaticModule.forRoot({
              rootPath: join(__dirname, '..', 'client'),
      }),
    MongooseModule.forRootAsync({
          imports:[ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<String>('mongodb_uri')
          }),
          inject: [ConfigService]
        }
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
