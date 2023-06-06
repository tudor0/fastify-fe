import { useEffect, useState } from "react";
import useUserStore from "../../../store/userStore";
import { PostType } from "../../../types/posts";
import { formatTimeAgo } from "../../../utils/time";
import ThumbsUp from "../../../icons/ThumbsUp";

const MyPosts = () => {
  const [userPosts, setUserPosts] = useState<PostType[]>([]);
  const { id } = useUserStore((state) => state.user);

  useEffect(() => {
    const getData = async () => {
      const resp = await fetch("/api/posts/get-user-posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      });

      const data: PostType[] = await resp.json().then((data) => data.data);
      console.log(data);
      setUserPosts(data);
    };

    getData();
  }, []);

  return (
    <div className="lg:max-w-lg mx-auto">
      {userPosts?.map((post) => {
        const {
          author_id,
          author_userName,
          content,
          created_at,
          title,
          likes
        } = post;
        const formattedDate = formatTimeAgo(post.created_at);

        return (
          <div className="card bg-white rounded shadow m-2 py-3 px-5">
            <div className="card-header text-gray-800">{author_userName}</div>
            <div className="card-body px-0 pt-4">
              <h5 className="card-title text-xl text-gray-800 font-bold mb-2">{title}</h5>
              <p className="card-text text-gray-600">{content}</p>
            </div>
            <div className="card-footer flex items-center justify-between">
              <div className="flex items-center text-gray-500">
                <ThumbsUp className="mr-1" />
                <span>{0} likes</span>
              </div>
              |
              <p className="card-time text-gray-400 text-sm mt-2">
                {formattedDate}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyPosts;
