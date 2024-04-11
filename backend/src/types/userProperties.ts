import { User, Commit, Repository, Issue, LikedRepo, PullRequest } from '@prisma/client';

export type UserWithRelations = User & {
   commits: Commit[];
   repositoriesOwned: Repository[];
   repositoriesContributed: Repository[];
   issues: Issue[];
   comments: Comment[];
   files: File[];
   likedRepo: LikedRepo[];
   PullRequest: PullRequest[];
};
