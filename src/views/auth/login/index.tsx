import { useState } from "react";
import styles from "./login.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const LoginView = () => {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");

  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: any) => {
    setError("");
    setisLoading(true);
    event.preventDefault();
    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setisLoading(false);
        push(callbackUrl);
      } else {
        setisLoading(false);
        setError("Email or Password is incorrect");
      }
    } catch (error: any) {
      setisLoading(false);
      setError("Email or Password is incorrect");
    }
  };
  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>ADMIN ACCESS ONLY!!</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className={styles.login__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.login__form__item}>
            <label htmlFor="email" className={styles.login__form__item__label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={styles.login__form__item__input}
            />
          </div>
          <div className={styles.login__form__item}>
            <label
              htmlFor="password"
              className={styles.login__form__item__label}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className={styles.login__form__item__input}
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white p-[10px] w-[100%]"
            disabled={isLoading}
          >
            {isLoading ? "Loading...." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
