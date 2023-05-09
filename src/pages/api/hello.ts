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
    // const img = await fetchImages(prompt.prompt);
    return res.status(200).json({ img: `![Image](https://oaidalleapiprodscus.blob.core.windows.net/private/org-Na0TdtbgraQ9gI0cVWL8rnIb/user-te9nrtxST05bPNI4H82QFZal/img-ePZCmRv9QEXjM1fqJe1I3Qed.png?st=2023-05-09T21%3A58%3A24Z&se=2023-05-09T23%3A58%3A24Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-09T20%3A17%3A35Z&ske=2023-05-10T20%3A17%3A35Z&sks=b&skv=2021-08-06&sig=5WbC%2BzV7fHUfaNuVsk93W0JORMC47FYuAdov03C2AYY%3D)` });
  } catch (error) {
    return res.status(400).send(error);
  }
}
