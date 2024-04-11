export interface User {
   username: string;
   email: string;
   profilePictureUrl: string;
   pronouns: string | null;
   name: string;
   bio: string | null;
   commits: any[];
   repositoriesOwned: {
     id: number;
     name: string;
     description: string;
     readme: any;
     visibility: boolean;
     createdAt: string;
     updatedAt: string;
     ownerId: number;
   }[];
   repositoriesContributed: any[];
   issues: any[];
   comments: any[];
   files: any[];
   likedRepo: any[];
   PullRequest: any[];
 }
