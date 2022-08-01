import { Test, TestingModule } from '@nestjs/testing';
import { ProtoController } from './proto.controller';

describe('ProtoController', () => {
  let controller: ProtoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProtoController],
    }).compile();

    controller = module.get<ProtoController>(ProtoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
