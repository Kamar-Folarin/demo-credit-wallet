import { Test, TestingModule } from '@nestjs/testing';
import { WalletRepository } from '../wallets/wallet.repository';
import { UserRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { WalletService } from '../wallets/wallet.service';
import { TransactionsRepository } from './transactions.repository';
import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let repository: TransactionsRepository;
  let walletService: WalletService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsService,
      {
        provide: TransactionsRepository,
        useValue: {
          create: jest.fn(),
          findOne: jest.fn(),
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
        },},
        {
          provide:WalletRepository,
          useValue: {
            createWallet: jest.fn(),
            updateWallet: jest.fn(),
          },},
      UsersService,
      WalletService,
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    repository = module.get<TransactionsRepository>(TransactionsRepository);
    userService = module.get<UsersService>(UsersService);
    walletService = module.get<WalletService>(WalletService);
  });

  const result: any=   {
    id: '236734789t79340',
    fromAccount: '536748-387530370-4398',
    toAccount: '478549-873809320-7329',
    amount: 100000,
    title: 'Salary',
  };

  it('allows user to send funds to another user', async () => {
    result;

    const id = '236734789t79340';
    const CreateTransactionDto = {
      fromAccount: '536748-387530370-4398',
    toAccount: '478549-873809320-7329',
    amount: 100000,
    title: 'Salary',
    receiverId: 'e85909-58945-4834'
    };

    jest.spyOn(service, 'sendMoney').mockImplementation(async () => result);
    expect(await service.sendMoney(id,CreateTransactionDto)).toBe(result);
  });

  
  it('allows user to withdraw money', async () => {
    result;

    const id = '236734789t79340';
    
    const  fromAccount= '536748-387530370-4398';
   
    const amount= 100000;
    

    jest.spyOn(service, 'withdrawFromAccount').mockImplementation(async () => result);
    expect(await service.withdrawFromAccount(id,fromAccount, amount)).toBe(result);
  });



  it('allows user to fund their account', async () => {
    result;

    const id = '236734789t79340';
    
    const  account= '536748-387530370-4398';
   
    const amount= 100000;
    

    jest.spyOn(service, 'fundAccount').mockImplementation(async () => result);
    expect(await service.fundAccount(id,account, amount)).toBe(result);
  });



  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
