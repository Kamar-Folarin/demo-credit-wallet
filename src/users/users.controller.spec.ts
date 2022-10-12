import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { Response } from 'express';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        ConfigService,
        {
          provide: AuthService,
          useValue: {
            saltPassword: jest.fn(),
            validateUser: jest.fn(),
            login: jest.fn(),
          },
      },
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(),
            getUserById: jest.fn(),
            updateUser: jest.fn(),
            getUserByEmail: jest.fn(),
            getUserByUsername: jest.fn(),
            getUserData: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    authService = module.get<AuthService>(AuthService);
  });

  const result = {
    id: '236734789t79340',
    email: 'tosin@gmail.com',
    firstName: 'Tosin',
    lastName: 'Emma',
    username: 'tosinemma',
    salt: '7348892ksfdnkl',
    hash: 'wqqyuewfgwe',
    password: '1234566',
    balance: 0,
  };

  describe('create a new user', () => {
    it('should create a new user', async () => {
      result;

      const id = '236734789t79340';
      const CreateUserDto = {
        email: 'tosin@gmail.com',
        firstName: 'Tosin',
        lastName: 'Emma',
        password: 'ur3456.789WR0',
        username: 'tosinemma',
      };
      let res :Response;

      jest.spyOn(service, 'createUser').mockImplementation(async () => result);

      expect(
        await controller.signUp( CreateUserDto, res),
      ).toBe(result);
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
