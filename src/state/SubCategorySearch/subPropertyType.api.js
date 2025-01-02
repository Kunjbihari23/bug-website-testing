import API from '@/instance/api';
import instance from '@/instance/instance';

const subPropertyTypeList = async () => {
  const resp = await instance.get(API.searchList.subPropertyList);
  return resp.data;
};

export default subPropertyTypeList;

export const subPropTypeFilter = async (payload) => {
  const resp = await instance.get(API.searchList.subPropertyFilterList + `?CatId=${Number(payload.CatID)}`);
  return resp.data;
};
