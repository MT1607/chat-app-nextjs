import dynamic from "next/dynamic";

const UserButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.UserButton),
  { ssr: false }
);

export default function Home() {
  return <UserButton />;
}
