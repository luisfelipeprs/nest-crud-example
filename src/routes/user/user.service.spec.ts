import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../../database/repositories/user.repository';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Partial<Record<keyof UserRepository, jest.Mock>>;

  beforeEach(async () => {
    userRepository = {
      getUsers: jest.fn(),
      findById: jest.fn(),
      userByEmail: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: userRepository },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const mockUsers = [
        new UserEntity({ id: '1', name: 'John Doe', email: 'john@example.com', password: 'hashedPassword' }),
      ];
      userRepository.getUsers.mockResolvedValue(mockUsers);

      const result = await userService.getUsers();
      expect(result).toEqual([{ id: '1', name: 'John Doe' }]);
      expect(userRepository.getUsers).toHaveBeenCalledTimes(1);
    });

    it('should throw a NotFoundException if no users are found', async () => {
      userRepository.getUsers.mockResolvedValue([]);

      await expect(userService.getUsers()).rejects.toThrow(NotFoundException);
      expect(userRepository.getUsers).toHaveBeenCalledTimes(1);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const mockUser = new UserEntity({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedPassword',
      });
      userRepository.userByEmail.mockResolvedValue(null);
      userRepository.createUser.mockResolvedValue(mockUser);

      const result = await userService.createUser({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });

      expect(result).toEqual({ id: '1', name: 'John Doe' });
      expect(userRepository.userByEmail).toHaveBeenCalledWith('john@example.com');
      expect(userRepository.createUser).toHaveBeenCalled();
    });

    it('should throw a ConflictException if email already exists', async () => {
      const existingUser = new UserEntity({
        id: '1',
        name: 'Existing User',
        email: 'existing@example.com',
        password: 'hashedPassword',
      });
      userRepository.userByEmail.mockResolvedValue(existingUser);

      await expect(
        userService.createUser({
          name: 'John Doe',
          email: 'existing@example.com',
          password: 'password123',
        }),
      ).rejects.toThrow(ConflictException);
      expect(userRepository.userByEmail).toHaveBeenCalledWith('existing@example.com');
    });
  });
});
