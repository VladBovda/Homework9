export interface CommentData {
    id: number;
    text: string;
    createdAt: string;
    user: {
        id: number;
        username: string;
    };
}
