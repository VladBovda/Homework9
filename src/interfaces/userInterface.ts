export interface UserState { 
    isAuthenticated: boolean;
    token: string | null;
    userId: number | null;
    username: string | null;
};

export interface UserProfile {
    userId: number;
    username: string;
}