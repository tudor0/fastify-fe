import { useState } from "react";
import { useForm } from "react-hook-form";
import useUserStore from "../../store/userStore";

type FormValues = {
  title: string;
  content: string;
};

const AddPost = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { firstName, id, userName } = useUserStore((state) => state.user);

  const onSubmit = async (data: FormValues) => {
    const postData = {
      ...data,
      id,
      userName
    };

    try {
      const resp = await fetch(`/api/posts/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });

      const { data } = await resp.json().then((data) => data);

      console.log(data);
    } catch (error) {
      console.log(error);
    }

    // Reset form fields and close the modal
    reset();
    setIsModalOpen(false);
  };

  return (
    <div className="bg-neutral">
      <button
        className="btn btn-primary w-full"
        onClick={() => setIsModalOpen(true)}>
        {`La ce te gandesti, ${firstName}?`}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="modal modal-open">
            <div className="modal-box">
              <h2 className="modal-title">Creeaza o postare, {firstName}!</h2>

              <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label htmlFor="title" className="label">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className={`input input-bordered ${
                      errors.title ? "input-error" : ""
                    }`}
                    placeholder="Despre ce vrei sa scrii?"
                    {...register("title", {
                      required: true,
                      minLength: 3,
                      maxLength: 40
                    })}
                  />
                  {errors.title && (
                    <span className="text-error">Title is required</span>
                  )}
                </div>

                <div className="form-control">
                  <label htmlFor="content" className="label">
                    Content
                  </label>
                  <textarea
                    id="content"
                    className={`textarea textarea-bordered ${
                      errors.content ? "input-error" : ""
                    }`}
                    placeholder={`La ce te gandesti, ${firstName}?`}
                    {...register("content", {
                      required: true,
                      minLength: 3,
                      maxLength: 200
                    })}
                  />
                  {errors.content && (
                    <span className="text-error">Content is required</span>
                  )}
                </div>

                <div className="modal-action">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPost;
