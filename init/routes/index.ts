import { Request, Response, Router } from 'express';
import { getPullRequests } from './github/client';
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
        const pullRequests = await getPullRequests(TOKEN, OWNER, REPO);
        const prs = pullRequests.map((pullRequest) => {
            const {
                id,
                number,
                title,
                user: { login: author },
                commit_count,
            } = pullRequest;
            return {
                id,
                number,
                title,
                author,
                commit_count,
            };
        });
        res.status(200).json({ status: 'ok' });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: error });
    }
});

export default router;
