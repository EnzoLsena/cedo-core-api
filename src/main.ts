import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ParseIntIdPipe } from './common/pipes/parse-int-id.pipe';
import { TimingConnectionIntercptor } from './common/intercptors/timing-connection.interceptor';
import { ErrorHandlingInterceptor } from './common/intercptors/error-handling.interceptor';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    new ParseIntIdPipe(),
  );
  app.useGlobalInterceptors(
    new TimingConnectionIntercptor(),
    new ErrorHandlingInterceptor(),
  );

  const config = new DocumentBuilder()
    .setTitle('Cêdo Core Api')
    .setDescription('The cedo-core-api description')
    .setVersion('1.0')
    .addTag('api-core')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((error: Error) => {
  console.error('Application failed to start');
  console.error(error.stack);
  process.exit(1);
});
