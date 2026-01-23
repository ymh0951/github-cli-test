import { User, IUser } from '../models/User';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { UserRole, JWTPayload } from '../types';

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  };
}

export const registerUser = async (data: RegisterData): Promise<AuthTokens> => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const user = new User({
    email: data.email,
    password: data.password,
    name: data.name,
    role: data.role || UserRole.PATIENT
  });

  await user.save();

  const payload: JWTPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role
    }
  };
};

export const loginUser = async (data: LoginData): Promise<AuthTokens> => {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await user.comparePassword(data.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const payload: JWTPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role
    }
  };
};

export const refreshAccessToken = async (refreshToken: string): Promise<{ accessToken: string }> => {
  try {
    const decoded = verifyRefreshToken(refreshToken);

    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new Error('User not found');
    }

    const payload: JWTPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    };

    const accessToken = generateAccessToken(payload);

    return { accessToken };
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

export const getCurrentUser = async (userId: string): Promise<IUser | null> => {
  return User.findById(userId).select('-password');
};
