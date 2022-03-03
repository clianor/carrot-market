import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import spClient from '@libs/server/spClient';
import formidable from 'formidable';
import fs from 'fs';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const form = new formidable.IncomingForm({ multiples: true, keepExtensions: true });

  const { filename, filepath, mimetype } = await new Promise((resolve, reject) => {
    form.parse(req, (error, fields, files) => {
      if (error) {
        reject(error);
        return;
      }
      const { originalFilename, filepath, mimetype }: any = files['file'];
      resolve({ filename: originalFilename, filepath, mimetype });
    });
  });

  const exists = fs.existsSync(filepath);
  if (!exists) return res.status(500).json({ ok: false, error: 'internal server error' });

  const file = fs.readFileSync(filepath);
  const { error: uploadError } = await spClient.storage.from('files').upload(filename, file, {
    contentType: mimetype,
    upsert: true,
  });
  if (uploadError) return res.status(500).json({ ok: false, error: 'internal server error' });

  const { publicURL, error } = spClient.storage.from('files').getPublicUrl(filename);
  if (error) return res.status(500).json({ ok: false, error: 'internal server error' });

  res.json({
    ok: true,
    url: publicURL,
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  }),
);
