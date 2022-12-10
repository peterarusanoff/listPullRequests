import axios, { AxiosError } from 'axios';
import logger from '../../logger';
import { PullRequests } from '../../interfaces/pullRequest';

const getPullRequests = async (TOKEN: string, OWNER: string, REPO: string): Promise<PullRequests[]> => {
    try {
        const response = await axios({
            method: 'get',
            baseURL: `https://api.github.com/repos/${OWNER}/${REPO}/pulls`,
            headers: {
                Authorization: `Bearer ${TOKEN}`,
                'X-GitHub-Api-Version': '2022-11-28',
            },
            transformRequest: [
                function (data) {
                    return data;
                },
            ],
            transformResponse: [
                function (data) {
                    return data;
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

export { getPullRequests };