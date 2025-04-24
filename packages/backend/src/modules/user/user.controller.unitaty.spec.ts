import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';


import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


// findAll
const userEntityList: UserEntity[] = [
  new UserEntity({
    id: 1,
    firstName: 'firstName-1',
    lastName: 'lastName-1',
    email: 'usermail1@teste.com',
    password: '123456',

  }),
  new UserEntity({
    id: 2,
    firstName: 'firstName-2',
    lastName: 'lastName-2',
    email: 'usermail2@teste.com',
    password: '123456',

  }),
];

// Create
const bodyCreated: CreateUserDto = {
  firstName: 'firstName-0',
  lastName: 'lastName-0',
  email: 'usermail0@teste.com',
  password: '123456',
};
const newUserEntity = new UserEntity(bodyCreated);

// Update
const bodyUpdated: UpdateUserDto = {
  firstName: 'firstName-3',
  lastName: 'lastName-3',
  email: 'usermail3@teste.com',
  password: '123456',

};
const updatedUserEntity = new UserEntity(bodyUpdated);

describe('UserController', () => {

  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(userEntityList),
            create: jest.fn().mockResolvedValue(newUserEntity),
            findOneOrFail: jest.fn().mockResolvedValue(userEntityList[0]),
            update: jest.fn().mockResolvedValue(updatedUserEntity),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('index', () => {
    it('should return a user list entity successfully', async () => {
      const result = await userController.index();

      expect(result).toEqual(userEntityList);
      expect(typeof result).toEqual('object');
      expect(userService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(userService, 'findAll').mockRejectedValueOnce(new Error('') as never);

      expect(userController.index()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a new user item successfully', async () => {
      const result = await userController.create(bodyCreated);

      expect(result).toEqual(newUserEntity);
      expect(userService.create).toHaveBeenCalledTimes(1);
      expect(userService.create).toHaveBeenCalledWith(bodyCreated);
    });

    it('should throw an exception', () => {
      jest.spyOn(userService, 'create').mockRejectedValueOnce(new Error('') as never);
      expect(userController.create(bodyCreated)).rejects.toThrow();
    });
  });

  describe('show', () => {
    it('should get a user item successfully', async () => {
      const result = await userController.show(1);

      expect(result).toEqual(userEntityList[0]);
      expect(userService.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(userService.findOneOrFail).toHaveBeenCalledWith(1);
    });

    it('should throw an exception', async () => {
      jest.spyOn(userService, 'findOneOrFail').mockRejectedValueOnce(new Error('') as never);
      expect(userController.show(1)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a user item successfully', async () => {
      const result = await userController.update(1, bodyUpdated);

      expect(result).toEqual(updatedUserEntity);
      expect(userService.update).toHaveBeenCalledTimes(1);
      expect(userService.update).toHaveBeenCalledWith(1, bodyUpdated);
    });

    it('should throw an exception', () => {
      jest.spyOn(userService, 'update').mockRejectedValueOnce(new Error('') as never);
      expect(userController.update(1, bodyUpdated)).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove a user item successfully', async () => {
      const result = await userController.remove(1);

      expect(result).toBeUndefined();
      expect(userService.remove).toBeCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(userService, 'remove').mockRejectedValueOnce(new Error('') as never)
      expect(userController.remove(1)).rejects.toThrow();
    });
  });
});
