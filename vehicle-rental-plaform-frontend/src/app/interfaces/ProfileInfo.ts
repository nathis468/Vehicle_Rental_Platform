export interface ProfileInfo {
    _id: string;
    userName: string;
    profilePic: string | ArrayBuffer;
    contactNumber: string;
    bio: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
}