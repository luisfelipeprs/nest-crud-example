import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(), // Mock da função `sign` do JwtService
          },
        },
        {
          provide: UserService,
          useValue: {
            validateUser: jest.fn(), // Mock da função `validateUser` do UserService
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UserService>(UserService);
  });

  it('deve retornar um token válido ao fazer login com credenciais corretas', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    // const userMock = { id: 1, email };

    // mock para a função `validateUser`
    // type JwtPayload = {
    //   id: string | number;
    //   email: string;
    // };
    
    const userMock = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      password: 'hashedPassword123',
    };
    
    jest.spyOn(userService, 'validateUser').mockResolvedValue(userMock);
    
    jest.spyOn(jwtService, 'sign').mockReturnValue('valid_token');

    const result = await authService.login(email, password);

    expect(userService.validateUser).toHaveBeenCalledWith(email, password);
    expect(jwtService.sign).toHaveBeenCalledWith({ id: userMock.id, email: userMock.email });
    expect(result).toEqual({ access_token: 'valid_token' });
  });

  it('deve lançar um erro ao tentar login com credenciais inválidas', async () => {
    const email = 'test@example.com';
    const password = 'wrongpassword';

    jest.spyOn(userService, 'validateUser').mockResolvedValue(null);

    await expect(authService.login(email, password)).rejects.toThrowError('Invalid credentials');
    expect(userService.validateUser).toHaveBeenCalledWith(email, password);
    expect(jwtService.sign).not.toHaveBeenCalled();
  });
});
