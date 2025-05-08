import { useEffect } from "react";
import { useUserStore } from "../store/user";

export const Auth = () => {
  const { loginUser } = useUserStore();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const openid = urlParams.get('openid.identity');

    async function getData() {
      if (openid) {
        try {
          const url = `http://localhost:3000/api/steam/ISteamUser/GetPlayerSummaries/v0002/?steamids=${openid}`;
          const response = await fetch(url);
          const userData: {id: string; name: string; avatar: string;} = await response.json();
          loginUser(userData)
          window.location.href = '/';
        } catch (error) {
          console.error('Ошибка:', error);
        }
      }
    }
    getData();
  }, []);

  return <div className="p-4">Авторизация...</div>;
};