import { useState } from "react";
import styles from "./code.module.scss";
import Link from "next/link";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const FrontFormView = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [codeContent, setCodeContent] = useState("");

  const handleSubmitCode = async (event: any) => {
    setError("");
    setIsLoading(true);
    event.preventDefault();
    const data = {
      name: event.target.name.value,
      code: codeContent, // Use codeContent state instead of form input
    };
    const result = await fetch("/api/sendcode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (result.status == 200) {
      event.target.reset();
      setCodeContent(""); // Clear the editor content
      setIsLoading(false);
      alert("Kode berhasil dikirim!!");
    } else {
      setIsLoading(false);
      setError(result.status ? "Something is wrong!" : "");
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>Kirim kode disini ya!</h1>
      <p className="my-3">
        Mau cek kodinganmu?{" "}
        <Link className="text-blue-600 hover:text-purple-700" href={"/codes"}>
          kesini aja!!
        </Link>
      </p>
      {error && <p className="text-red-500">{error}</p>}
      <div className={styles.login__form}>
        <form onSubmit={handleSubmitCode}>
          <div className={styles.login__form__item}>
            <label htmlFor="name" className={styles.login__form__item__label}>
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Tulis nama mu disini"
              className={styles.login__form__item__input}
            />
          </div>
          <div className={styles.login__form__item}>
            <label htmlFor="code" className={styles.login__form__item__label}>
              Kode
            </label>
            {/* Replace textarea with ReactQuill for WYSIWYG editor */}
            <ReactQuill
              value={codeContent}
              onChange={setCodeContent}
              className={styles.login__form__item__textarea}
              theme="snow"
              placeholder="Tulis kodinganmu disini.."
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white p-[10px] w-[100%]"
            disabled={isLoading}
          >
            {isLoading ? "Loading...." : "Kirim!"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FrontFormView;
