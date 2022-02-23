import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withIronSessionApiRoute } from 'iron-session/next';
import client from '@libs/server/client';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  console.log(req.session.user);
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });
  if (!profile) return res.status(404).end();
  res.status(200).json({ ok: true, profile });
}

export default withIronSessionApiRoute(withHandler('GET', handler), {
  cookieName: 'carrotsession',
  password: '9845904809485098594385093840598df;slkgjfdl;gkfsdjg;ldfksjgdsflgjdfklgjdflgjflkgjdgd',
});
