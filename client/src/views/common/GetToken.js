import { useCookies } from "react-cookie";

function GetToken() {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const { accessToken: token } = cookies.accessToken || {
    accessToken: undefined,
  };
  return token;
}

export default GetToken;
