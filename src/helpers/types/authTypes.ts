export type RegisterRequest = {
    email: string;
    password: string;
    name: string;
}

export type LoginRequest = {
    email: string;
    password: string;
}

export type AuthResponse = {
    success: boolean;
    user: {
        email: string;
        name: string;
    };
    accessToken: string;
    refreshToken: string;
}

export type UserResponse = {
    success: boolean;
    user: {
        email: string;
        name: string;
    };
}

export type TokenResponse = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
}

export type LogoutRequest = {
    token: string;
}

export type LogoutResponse = {
    success: boolean;
    message: string;
}

export type UpdateUserRequest = {
    email?: string;
    name?: string;
    password?: string;
}
