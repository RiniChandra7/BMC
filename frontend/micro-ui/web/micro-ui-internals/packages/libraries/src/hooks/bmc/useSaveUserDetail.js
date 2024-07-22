import { useQuery } from "react-query";

import SchemeService from "../../services/elements/Scheme";

// export const useCommonGet = (data, config = {}) => {
//   return useQuery(["CommonDetails"], () => SchemeService.get(data,config));
//   //return useMutation((data)=>{SchemeService.get(data,Options,config)});
// };
export const useSaveUserDetail = (data, config = {}) => {
  return useQuery(["UserDetails", data], () => SchemeService.saveUserDetails(data),config);
};
export default useSaveUserDetail;