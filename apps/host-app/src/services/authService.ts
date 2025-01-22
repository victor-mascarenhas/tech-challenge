import { AuthResponse } from "@/shared/models/User";
import { buildAxiosService } from "./axiosService";

const buildAuthService = () => {
  const { post } = buildAxiosService();

  const auth = async (data: { email: string; password: string }) => {
    try {
      const resp = await post<AuthResponse>("/user/auth", JSON.stringify(data));
      return {
        token: resp.data?.result?.token || "",
        username: resp.data?.result?.username || "",
      };
    } catch (e) {
      console.log(e);
      return {};
    }
  };

  return {
    auth,
  };
};
export default buildAuthService;
