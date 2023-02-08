import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('/v1/api')
  
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => console.log(`🚀Listen on port ${PORT} 🚀`))
}
bootstrap();
 