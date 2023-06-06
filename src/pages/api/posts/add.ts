import { NextApiRequest, NextApiResponse } from "next";
import fetchWithBearer from "../../../../utils/fetchWithBearer";

export default async function addPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, content, id, userName } = req.body;

  const token = req.cookies["jw-token"];

  console.log(id);
  if (!id || !userName)
    return res.status(400).json({ error: "Missing id or userName" });

  try {
    const resp = await fetchWithBearer(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          content,
          id,
          userName
        })
      },
      token
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
