import { AvatarWithMenu } from "components/AvatarWithMenu";
import Link from "next/link";
import { HeaderContainer } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <Link href="/">upskill.code</Link>

      <AvatarWithMenu />
    </HeaderContainer>
  );
}
