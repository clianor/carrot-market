import client from '@libs/server/client';
import withHandler, { type ResponseType } from '@libs/server/withHandler';
import mail from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

mail.setApiKey(process.env.SENDGRID_KEY!);

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { phone, email } = req.body;

  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + '';
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: 'Anonymouse',
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   to: process.env.MY_PHONE!,
    //   body: `Your login token is ${payload}.`,
    // });
    // console.log(message);
  } else if (email) {
    // const email = await mail.send({
    //   from: process.env.MY_EMAIL!,
    //   to: 'oraclian@estsecurity.com',
    //   subject: 'Your Carrot Market Verification Email',
    //   text: `Your token is ${payload}`,
    //   html: `<strong>Your token is ${payload}</strong>`,
    // });
    // console.log(email);
  }
  res.json({ ok: true });
}

export default withHandler({
  methods: ['POST'],
  handler,
  isPrivate: false,
});
