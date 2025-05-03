import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as path from 'path';

describe('Image Processing (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('POST /process/basic should return processed image buffer', async () => {
    const imagePath = path.join(__dirname, '..', 'images', 'input_image.png');
    console.log(`Testing with image at path: ${imagePath}`);  // Add debug log

    const response = await request(app.getHttpServer())
      .post('/process/basic')
      .attach('image', imagePath)
      .expect(201)
      .catch(err => {
        console.error('Error during request:', err);  // Log any error
        throw err;
      });

    console.log('Response:', response.body);  // Log response body for debugging

    expect(response.header['content-type']).toBe('image/png');
    expect(response.body).toBeInstanceOf(Buffer);
    expect(response.body.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await app.close();
  });
});
