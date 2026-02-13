import { UserProfile } from "./userProfile";

export interface ExhibitInterface {
    id: string | number;
    imageUrl: string;
    description: string;
    commentCount: number;
    user: UserProfile;
}
