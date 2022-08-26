import { useSession } from "next-auth/react";
import Image from "next/image";
import { HeaderContainer, AvatarContainer } from "./styles";

export function Header() {
  const { data, status } = useSession();

  return (
    <HeaderContainer>
      <h1>upskill.code</h1>

      {data?.user?.image && (
        <AvatarContainer>
          <Image
            layout="fill"
            objectFit="cover"
            src={data.user?.image}
            alt=""
          />
        </AvatarContainer>
      )}
    </HeaderContainer>
  );
}
