import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors({ allowedHeaders: '*' });
  /**
   * Inside of Docker you should mentioned explicitly '0.0.0.0'
   * since By default fastify is istening only on the localhost
   * 127.0.0.1 interface.
   */
  await app.listen(8080, '0.0.0.0', (error) => {
    if (error) {
      process.exit(1);
    }
  });
}
bootstrap();
