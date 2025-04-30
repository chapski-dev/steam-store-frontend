import { useEffect } from "react";

export const Auth = () => {
  useEffect(() => {
    const controller = new AbortController();
    const urlParams = new URLSearchParams(window.location.search);
    const openid = urlParams.get('openid.identity');

    async function getData() {
      if (openid) {
        try {
          const apiKey = "EE9BB2B722F11BDF596C8E5C7F8F75BD";
          const steamId = "76561198097316094";
          const url = `/api/ISteamUser/GetPlayerSummaries//v0002/?key=${apiKey}&steamids=${steamId}`;

          const response = await fetch(url, { signal: controller.signal });
          const fetchUserData = await response.json();
          const userData = {
            id: fetchUserData.response.players[0].steamid,
            name: fetchUserData.response.players[0].personaname,
            avatar: fetchUserData.response.players[0].avatar,
          };
          localStorage.setItem('user', JSON.stringify(userData));
          window.location.href = '/';
        } catch (error) {
          console.error('Ошибка:', error);
        }
      }
    }
    getData();

    return () => controller.abort(); // Отмена запроса при размонтировании
  }, []);

  return <div className="p-4">Авторизация...</div>;
};