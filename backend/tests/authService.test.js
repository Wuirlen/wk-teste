const authService = require('../src/services/authService');
const { User } = require('../src/models');

jest.mock('../src/models');

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('deve registrar um novo usuário com sucesso', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue({
        id: 1,
        name: 'Test User',
        email: 'test@example.com'
      });

      const result = await authService.register(userData);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user.email).toBe('test@example.com');
    });

    it('deve lançar erro se email já existir', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      User.findOne.mockResolvedValue({ id: 1, email: 'test@example.com' });

      await expect(authService.register(userData)).rejects.toThrow('Email já cadastrado');
    });
  });
});