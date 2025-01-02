import NewSearchPage from '@/components/newSearchPage/NewSeachPage';

import { Category, RentOrSell } from '@/components/SearchPage/StaticFilterArray';
import { getSSRSession } from '@/lib/getSSRSession';
import { getCitylistApi } from '@/state/cityList/citylist.api';
import { getlocalitylistApi } from '@/state/localityList/localityList.api';

export async function page({ params }) {
  const { isLoggedIn, user } = await getSSRSession();

  const parts = params.searchTitle.split('-');
  const PropertyCategoryID = Category.find((item) => item.label === parts[0].toLowerCase());
  const project_property = parts[1].toLowerCase() === 'project' ? 1 : 0;
  const cityList = await getCitylistApi();
  const citydata = cityList?.list.find((item) => item?.cityName === parts[parts.length - 1]);

  const localityList = await getlocalitylistApi({
    Cityid: citydata?.cityId,
    SearchString: '',
  });

  const areaData = localityList?.find((item) => item?.localityName == decodeURIComponent(parts[parts.length - 2]));
  const RENTORSELL = RentOrSell.find((item) => item?.label === parts[4].toLowerCase());
  const newSearchParams = {
    RENTORSELL: RENTORSELL?.value,
    PropertyCategoryID: PropertyCategoryID?.value,
    project_property: project_property,
    local: areaData?.id,
    city: citydata.cityId,
    LANDMARK: citydata.cityName,
  };

  const newParams = {
    propertyType: parts[1].toLowerCase(),
    rentOrSell: parts[4].toLowerCase(),
    category: parts[0].toLowerCase(),
    city: parts[parts.length - 1],
  };

  return (
    <div>
      <NewSearchPage isUserLoggedIn={isLoggedIn} user={user} newSearchParams={newSearchParams} newParams={newParams} />
    </div>
  );
}

export default page;
