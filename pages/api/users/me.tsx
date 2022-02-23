import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (!req.session.user) return res.status(401).json({ ok: false, message: 'Unauthorized' });
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });
  res.json({ ok: true, profile });
}

export default withApiSession(withHandler('GET', handler));
