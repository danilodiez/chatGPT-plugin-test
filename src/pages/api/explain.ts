import type { NextApiRequest, NextApiResponse } from "next";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY as string,
});

async function explainImage(image: any, question: any) {
  const output = await replicate.run(
    "andreasjansson/blip-2:4b32258c42e9efd4288bb9910bc532a69727f9acd26aa08e175713a0a857a608",
    {
      input: {
        image,
        question,
      },
    }
  );
  return output;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body)
  const imageToExplain = req.body.imageToExplain;
  const question = req.body.question
  try {
    const explanation = await explainImage(imageToExplain, question);
    return res.status(200).json({ explanation });
  } catch (error) {
    return res.status(400).json({error});
  }
}
