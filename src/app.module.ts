import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MsgModule } from './msg/msg.module';

@Module({
  imports: [ ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`,
    isGlobal: true,
    // load: [appConfiguration],
  }),
  TypeOrmModule.forRootAsync({
    useFactory: () => ({
      // ...defaultDatabaseOptions,
      // name: 'connection_postgres',
      type: 'postgres',
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 5432,
      database: process.env.DB_DATABASE || 'chat',
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '774936188',
      entities: ['dist/**/*.entity.js', '**/*.entity.js'],
      migrations: ['dist/migrations/*{.ts,.js}'],
      synchronize: true,
    }),
    dataSourceFactory: async (options) => {
      const dataSource = await new DataSource(options).initialize();
      return dataSource;
    },
  }),MsgModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
