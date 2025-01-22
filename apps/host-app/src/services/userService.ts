import { buildAxiosService } from "@/services/axiosService";
import { AxiosRespData, NovaContaDTO } from "@/shared/models/User";

const userService = () => {
  const { post } = buildAxiosService();

  const create = async (data: NovaContaDTO) => {
    try {
      const resp = await post<AxiosRespData>("/user", JSON.stringify(data));
      return { message: resp.data.message, status: resp.status };
    } catch (e: any) {
      console.log(e?.data?.message);
      return { status: e?.status };
    }
  };

  return {
    create,
  };
};

export default userService;
