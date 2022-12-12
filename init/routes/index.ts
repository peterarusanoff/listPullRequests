/* eslint-disable no-restricted-syntax */
import { Request, Response, Router } from 'express';
import { getPullRequests, getCommitsAndAuthor } from './github/client';
import logger from '../logger';

const router = Router();

/* GET home page. */
router.get('/', async (req: Request, res: Response) => {
    try {
        res.status(200).json({ status: 'ok' });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: error });
    }
});

router.post('/pullRequests', async (req: Request, res: Response) => {
    try {
        const {
            body: { TOKEN, OWNER, REPO },
        } = req;
        const unfilteredPullRequests = await getPullRequests(TOKEN, OWNER, REPO);
        const pullRequests = [];
        for await (const pullRequest of unfilteredPullRequests) {
            const {
                id,
                number,
                title,
                head: { ref, repo },
            } = pullRequest;

            try {
                const commits = await getCommitsAndAuthor(TOKEN, repo?.fork ? repo?.owner?.login : OWNER, REPO, ref);
                const {
                    commit: {
                        author: { name },
                    },
                    files,
                } = commits;
                pullRequests.push({
                    id,
                    number,
                    title,
                    author: name,
                    commit_count: files.length,
                });
            } catch (error) {
                pullRequests.push({
                    id,
                    number,
                    title,
                });
            }
        }
        res.status(200).json(pullRequests);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error });
    }
});

export default router;
