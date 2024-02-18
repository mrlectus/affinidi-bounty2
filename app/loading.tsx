import Image from "next/image";

const Loading = () => {
  return (
    <div className="w-full flex justify-center p-10">
      <span className="border-b-0 border-2 border-red-500 animate-spin rounded-full">
        <Image
          src="https://rnd-devops-app-infra-prod-static-assets.sgp1.digitaloceanspaces.com/tribex/stackup-web:0.1-d4c0313977db87c49f10eeb10d77a15467b74897/assets/squared_community_logo-6f1b304d1873206607f6de7e36ba1cbc02cbf705a7bb7c5957ba36c1013fad8c.png"
          alt="loading"
          width={100}
          height={100}
        />
      </span>
    </div>
  );
};

export default Loading;
