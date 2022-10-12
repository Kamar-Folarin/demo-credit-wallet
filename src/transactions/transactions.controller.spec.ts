import { Test, TestingModule } from '@nestjs/testing';
import { WalletRepository } from '../wallets/wallet.repository';
import { UserRepository } from '../users/users.repository';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

describe('TransactionsController', () => {
  let controller: TransactionsController;
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [TransactionsService,
      {
        provide: TransactionsService,
        useValue: {
          sendMoney: jest.fn(),
          withdrawFromAccount: jest.fn(),
          fundAccount: jest.fn(),
        },
      },
      {
        provide: UserRepository,
        useValue: {
          create: jest.fn(),
          findOne: jest.fn(),
          update: jest.fn(),
          findOneByEmail: jest.fn(),
          findOneByUsername: jest.fn(),
        },
      },
      {
        provide:WalletRepository,
        useValue: {
          createWallet: jest.fn(),
          updateWallet: jest.fn(),
        },},
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
    service = module.get<TransactionsService>(TransactionsService);
  });

  const result: any=   {
    id: '236734789t79340',
    fromAccount: '536748-387530370-4398',
    toAccount: '478549-873809320-7329',
    amount: 100000,
    title: 'Salary',
  };

  const user = {
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

  it('allows user to send funds to another user', async () => {
    result;

    const id = '236734789t79340';
    const createTransactionDto = {
      fromAccount: '536748-387530370-4398',
    toAccount: '478549-873809320-7329',
    amount: 100000,
    title: 'Salary',
    receiverId: 'e85909-58945-4834'
    };

    jest.spyOn(service, 'sendMoney').mockImplementation(async () => result);

      expect(
        await controller.sendMoney( user, createTransactionDto),
      ).toBe(result);
  });

  
  it('allows user to withdraw money', async () => {
    result;

    const id = '236734789t79340';
    
    const createTransactionDto = {
      fromAccount: '536748-387530370-4398',
    toAccount: '478549-873809320-7329',
    amount: 100000,
    title: 'Salary',
    receiverId: 'e85909-58945-4834'
    };
    

    jest.spyOn(service, 'withdrawFromAccount').mockImplementation(async () => result);

      expect(
        await controller.withdrawMoney( user, createTransactionDto),
      ).toBe(result);
  });



  it('allows user to fund their account', async () => {
    result;

    const id = '236734789t79340';
    const createTransactionDto = {
      fromAccount: '536748-387530370-4398',
    toAccount: '478549-873809320-7329',
    amount: 100000,
    title: 'Salary',
    receiverId: 'e85909-58945-4834'
    };
    const amount= 100000;
    
    jest.spyOn(service, 'fundAccount').mockImplementation(async () => result);

    expect(
      await controller.fundAccount( user, createTransactionDto),
    ).toBe(result);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
