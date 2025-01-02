import { useQuery } from '@tanstack/react-query';
import {
  getBhkChoice,
  getFetureCollections,
  GetpopularCitiesProperty,
  getProjectHighDemand,
  getStatisticCount,
  gettopProjects,
  getTrendingProjects,
} from './homePageApis.api';

export const useProjectHighDemandHook = ({ city }) => {
  return useQuery({
    queryKey: ['highProjectDemand', city],
    queryFn: () => getProjectHighDemand(city),
  });
};

export const useBhkChoice = ({ city }) => {
  return useQuery({
    queryKey: ['BhkChoice', city],
    queryFn: () => getBhkChoice(city),
  });
};

export const useStatisticHook = () => {
  return useQuery({
    queryKey: ['StatisticCount'],
    queryFn: () => getStatisticCount(),
  });
};

export const useFeatureCollectionHook = ({ city }) => {
  return useQuery({
    queryKey: ['FeatureCollectionsData', city],
    queryFn: () => getFetureCollections(city),
  });
};
export const useTrendingProjectHook = ({ city }) => {
  return useQuery({
    queryKey: ['trendingProjectData', city],
    queryFn: () => getTrendingProjects(city),
  });
};
export const useTopProjectHook = ({ city }) => {
  return useQuery({
    queryKey: ['topProjectData', city],
    queryFn: () => gettopProjects(city),
  });
};

export const usePopularCitiesProperty = () => {
  return useQuery({
    queryKey: ['popularCitiesProperty'],
    queryFn: () => GetpopularCitiesProperty(),
  });
};
