import { GithubUser } from "./github-user.interface";

export interface GithubCollectionResponse {
    total_count:        number;
    incomplete_results: boolean;
    items:              GithubUser[];
}


