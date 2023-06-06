import { NextApiRequest, NextApiResponse } from "next";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userName, firstName, lastName, email, password } = req.body;
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userName, firstName, lastName, email, password })
      }
    );

    const data = await resp.json();

    if (data.error) {
      return res.status(400).json({ error: data.error });
    }

    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
