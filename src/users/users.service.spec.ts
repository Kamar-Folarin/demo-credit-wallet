import { Test, TestingModule } from '@nestjs/testing';
import { User } from './interface/user.interface';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            findOneByEmail: jest.fn(),
            findOneByUsername: jest.fn(),
          },
        },],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UserRepository>(UserRepository);
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

  it('create a new user', async () => {
    result;

    const id = '236734789t79340';
    const CreateUserDto = {
      email: 'tosin@gmail.com',
      firstName: 'Tosin',
      lastName: 'Emma',
      password: 'ur3456.789WR0',
      username: 'tosinemma',
    };

    jest.spyOn(service, 'createUser').mockImplementation(async () => result);
    expect(await service.createUser(CreateUserDto)).toBe(result);
  });

  
  it('should get an already existing user details', async () => {
    result as User;
    const id = '142536';

    jest.spyOn(service, 'getUserById').mockImplementation(async () => result);

    expect(await service.getUserById(id)).toBe(result);
  });

  it('should get user details by username', async () => {
    result;
    const username = 'Tosyn';

    jest
      .spyOn(service, 'getUserByUsername')
      .mockImplementation(async () => result);

    expect(await service.getUserByUsername(username)).toBe(result);
  });

  
  it('should return an existing user details', async () => {
    result;

    const email = 'tosin@gmail.com';

    jest.spyOn(service, 'getUserByEmail').mockImplementation(async () => result);

    expect(await service.getUserByEmail(email)).toBe(result);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
