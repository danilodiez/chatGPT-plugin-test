// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.SECRET_API_KEY,
});

const openai = new OpenAIApi(configuration);
type Data = {
  img: string | undefined;
};

async function fetchImages(prompt: string) {
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });
  return response.data.data[0].url;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | unknown>
) {
  const prompt = req.body;
  try {
    const img = await fetchImages(prompt.prompt);
    return res.status(200).json({ img: `![Image](${img})` });
  } catch (error) {
    return res.status(400).json({error});
  }
}
