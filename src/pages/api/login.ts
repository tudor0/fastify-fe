import { NextApiRequest, NextApiResponse } from "next";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await resp.json();

  if (data.error) {
    return res.status(400).json({ error: data.error });
  }

  res.status(200).json({ data });
}
