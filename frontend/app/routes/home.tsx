import TrafficContainer from "~/components/Traffic/TrafficContainer";
import type { Route } from "./+types/home";
import loginStyles from "../components/Auth/styles.css?url";
import type { LinksFunction } from "@remix-run/node";
import { useAuth } from "~/context/AuthContext";
import { useEffect, useState } from "react";
import Login from "~/components/Auth/Login";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: loginStyles }
];
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cortexre Dashboard" },
    { name: "description", content: "Interactive Dashboard with Firebase" },
  ];
}


export default function Home() {
  const { user } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return user ? <TrafficContainer /> : <Login/>;
}

