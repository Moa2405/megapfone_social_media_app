import { useAxiosHook } from "../../hooks/useAxiosHook";
import url from "../../common/url";
import ProfileMedia from "./ProfileMedia";

const UsersProfile = ({ user }) => {



  return (
    <ProfileMedia media={userProfile} name={user} />
  );
}

export default UsersProfile;