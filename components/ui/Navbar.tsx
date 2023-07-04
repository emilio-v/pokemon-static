import { Spacer, Text, useTheme, Image } from "@nextui-org/react";
import Link from "next/link";

const randomPokemon = Math.floor(Math.random() * 151) + 1;

export const Navbar = () => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "0px 20px",
        backgroundColor: theme?.colors.gray100.value,
      }}
    >
      <Link href="/" style={{ display: "flex" }}>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemon}.png`}
          alt="Icon"
          width={70}
          height={70}
        />
        <Text color="white" h2 css={{ margin: 0 }}>
          P
        </Text>
        <Text color="white" h3 css={{ margin: 0 }}>
          okemon
        </Text>
      </Link>

      <Spacer css={{ flex: 1 }} />

      <Link href="/favorites">
        <Text color="white">Favorites</Text>
      </Link>
    </div>
  );
};
