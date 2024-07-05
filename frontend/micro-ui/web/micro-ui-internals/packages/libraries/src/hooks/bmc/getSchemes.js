import { useQuery } from "react-query";

import SchemeService from "../../services/elements/Scheme";

export const useSchemesGet = (data, config = {}) => {
  return useQuery(["SchemeDetails", data], () => SchemeService.get(data),config);
};
export default useSchemesGet;