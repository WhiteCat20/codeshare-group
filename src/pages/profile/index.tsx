import { useSession } from "next-auth/react";

const ProfilePage = () => {
 const { data }: any = useSession();

  return (
    <div>
      <h1>Profile</h1>
      <p>{data &&data.user.name}</p>
    </div>
  );
};

export default ProfilePage;
