import { Other, RentOrSell, Category } from './StaticFilterArray';

export const parseURLParameters = (propertyTypeValue, rentSellValue, categoryValue, cityDetail, areaDetail) => {
  const propertyType = Other.find((item) => item.value == propertyTypeValue)?.label;
  const rentOrSell = RentOrSell.find((item) => item.value == rentSellValue)?.label;
  const category = Category.find((item) => item.value == categoryValue)?.label;
  const city = cityDetail;
  const area = areaDetail;

  return area
    ? `/search/${propertyType}/${rentOrSell}/${category}/${city}/${area}`
    : `/search/${propertyType}/${rentOrSell}/${category}/${city}`;
};
