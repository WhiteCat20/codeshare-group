import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Navbar.module.scss";
import { getServerSession } from "next-auth";
const Navbar = () => {
  const { data }: any = useSession();
  return (
    <div className={styles.navbar}>
      <div>
        Codeshare Group by{" "}
        <a className="text-blue-600" href="github.com/WhiteCat20">
          Faiz Rahmadani
        </a>
      </div>
      <div>{data && data.user.fullname}</div>
      {data ? (
        <button className={styles.navbar__button} onClick={() => signOut()}>Sign Out</button>
      ) : (
        <button className={styles.navbar__button} onClick={() => signIn()}>Sign In</button>
      )}
    </div>
  );
};

export default Navbar;

