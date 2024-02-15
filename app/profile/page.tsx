import { SVGLocation, SVGMessage, SVGPhone } from "@/components/icons/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserProfile } from "@/utils/utils";

const Profile = async () => {
  const {
    phone,
    email,
    givenName,
    picture,
    familyName,
    city,
    postalCode,
    country,
  } = await getUserProfile();

  return (
    <>
      <div className="flex flex-col p-4 justify-center items-center w-full gap-4">
        <div className="flex items-center justify-around w-full">
          <h2 className="text-2xl font-bold">
            {givenName} {familyName}
          </h2>
          <Avatar className="w-24 h-24">
            <AvatarImage src={picture as string} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4 pl-10">
        <div className="flex gap-4 items-center">
          <SVGMessage />
          {email}
        </div>
        <div className="flex gap-4 items-center">
          <SVGPhone />
          {phone}
        </div>
        <div className="flex gap-4 items-center">
          <SVGLocation />
          {city}, {postalCode}, {country}
        </div>
      </div>
    </>
  );
};
export default Profile;
