/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { EnhancementController } from './enhancement.controller';
import { EnhancementService } from './enhancement.service';

describe('EnhancementController', () => {
  let enhancementController: EnhancementController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EnhancementController],
      providers: [EnhancementService],
    }).compile();

    enhancementController = app.get<EnhancementController>(EnhancementController);
  });

  it('should be defined', () => {
    expect(enhancementController).toBeDefined();
  });

  // Example of a real test (replace with your actual method)
  // it('should enhance image with histogram equalization', async () => {
  //   const result = await enhancementController.histogramEqualization({ imagePath: 'test.png' });
  //   expect(result).toEqual(expectedOutput);
  // });
});
