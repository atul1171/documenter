import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('generate swagger spec', async () => {
    const config = new DocumentBuilder().setTitle('Checking').setDescription('This is supposed to work').setVersion('1.0').build();

    const document = SwaggerModule.createDocument(app, config);
    fs.writeFileSync(`${__dirname}/../doc-gen/swagger.json`, JSON.stringify(document));
  });
});
