import API from '@/instance/api';
import createFetchApi from '@/instance/createFetchApi';
import instance from '@/instance/instance';

export const getProjectHighDemand = async (city) => {
  const response = await instance.get(API.highDemanadProject.projectDemand + `?cityid=${city}`);
  return response.data.data;
};

export const getBhkChoice = async (city) => {
  const response = await instance.get(API.bhkChoice.bhkChoiceApi + `?cityid=${city}`);
  return response.data.data;
};

export const getStatisticCount = async () => {
  const response = await instance.get(API.statisticCount.statistics);
  return response.data.data;
};

export const getFetureCollections = async (city) => {
  const response = await instance.get(API.featureCollections.fetureCollect + `?cityid=${city}`);
  return response.data.data;
};
export const getTrendingProjects = async (city) => {
  const response = await instance.get(API.trendingProjects.trenidngProject + `?cityid=${city}`);
  return response.data.data;
};
export const gettopProjects = async (city) => {
  const response = await instance.get(API.topProjectApi.topProject + `?cityid=${city}`);
  return response.data.data;
};

// Explore Real Estate in Popular Cities LIST API
export const GetpopularCitiesProperty = async () => {
  const fetchApi = createFetchApi();
  const resp = await fetchApi(API.popularCitiesProperty, 'GET', 120);
  return resp.data;
};
