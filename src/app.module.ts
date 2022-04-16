import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true, //mongodb url을 읽을 수 있도록 설정
      useUnifiedTopology: true, //최신 mongodb 드라이버 엔진을 사용하도록 설정
      // useFindAndModify: false, // mongoose 버전 6.0 이상부터는 불필요
      // useCreateIndex: true,
    }),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

// set middleware
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;

  configure(consumer: MiddlewareConsumer) {
    // 모든 라우터에 미들웨어 적용
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // production 배포 시 false 지정해줄 것!
    mongoose.set('debug', this.isDev);
  }
}
