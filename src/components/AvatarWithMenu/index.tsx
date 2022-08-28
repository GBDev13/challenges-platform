import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  AvatarTrigger,
  DropdownArrow,
  DropdownContent,
  DropdownItem,
} from "./styles";

export function AvatarWithMenu() {
  const { data, status } = useSession();

  return (
    <DropdownMenu.Root>
      <AvatarTrigger>
        <Image
          layout="fill"
          objectFit="cover"
          src={data?.user?.image ? data.user.image : "/placeholder-user.svg"}
          alt=""
        />
      </AvatarTrigger>

      <DropdownMenu.Portal>
        <DropdownContent>
          {status === "authenticated" ? (
            <DropdownItem onClick={() => signOut()}>Sair</DropdownItem>
          ) : (
            <DropdownItem onClick={() => signIn("github")}>Entrar</DropdownItem>
          )}

          <DropdownArrow />
        </DropdownContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
