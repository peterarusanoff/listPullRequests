import axios, { AxiosError } from 'axios';
import { PullRequests } from '../../interfaces/pullRequest';
import { Commits } from '../../interfaces/commits';
import logger from '../../logger';

const getPullRequests = async (TOKEN: string | undefined, OWNER: string, REPO: string): Promise<PullRequests[]> => {
    try {
        const response = await axios({
            method: 'get',
            baseURL: `https://api.github.com/repos/${OWNER}/${REPO}/pulls`,
            headers: {
                ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : null),
                'X-GitHub-Api-Version': '2022-11-28',
            },
            transformRequest: [
                function (data) {
                    return data;
                },
            ],
            transformResponse: [
                function (data) {
                    return JSON.parse(data);
                },
            ],
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            logger.error(error.message);
        }
        throw error;
    }
};

const getCommitsAndAuthor = async (
    TOKEN: string | undefined,
    OWNER: string,
    REPO: string,
    ref: string,
): Promise<Commits> => {
    try {
        const response = await axios({
            method: 'get',
            baseURL: `https://api.github.com/repos/${OWNER}/${REPO}/commits/${ref}`,
            headers: {
                ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : null),
                'X-GitHub-Api-Version': '2022-11-28',
            },
            transformRequest: [
                function (data) {
                    return data;
                },
            ],
            transformResponse: [
                function (data) {
                    return JSON.parse(data);
                },
            ],
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            logger.error(error.message);
            console.log('TOKEN:', TOKEN, 'OWNER: ', OWNER, 'REPO: ', REPO, 'ref: ', ref);
        }
        throw error;
    }
};

export { getPullRequests, getCommitsAndAuthor };
