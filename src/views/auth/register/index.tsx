import { useState } from "react";
import styles from "./Register.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

const RegisterView = () => {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const handleSubmit = async (event: any) => {
    setError("");
    setisLoading(true);
    event.preventDefault();
    const data = {
      email: event.target.email.value,
      fullname: event.target.fullname.value,
      password: event.target.password.value,
    };
    const result = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (result.status == 200) {
      event.target.reset();
      setisLoading(false);
      push("/auth/login");
    } else {
      setisLoading(false);
      setError(result.status ? "Email already exist" : "");
    }
  };
  return (
    <div className={styles.register}>
      <h1 className={styles.register__title}>Register</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className={styles.register__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.register__form__item}>
            <label
              htmlFor="email"
              className={styles.register__form__item__label}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={styles.register__form__item__input}
            />
          </div>
          <div className={styles.register__form__item}>
            <label
              htmlFor="fullname"
              className={styles.register__form__item__label}
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Full Name"
              className={styles.register__form__item__input}
            />
          </div>
          <div className={styles.register__form__item}>
            <label
              htmlFor="password"
              className={styles.register__form__item__label}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className={styles.register__form__item__input}
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white p-[10px] w-[100%]"
            disabled={isLoading}
          >
            {isLoading ? "Loading...." : "Register"}
          </button>
        </form>
      </div>
      <p className="mt-4">
        Sudah punya akun? login{" "}
        <Link className="text-red-600" href={"/auth/login"}>
          disini
        </Link>
      </p>
    </div>
  );
};

export default RegisterView;
