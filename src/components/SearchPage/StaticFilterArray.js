export const constructionStatus = [
  { label: 'Ready to Move', value: '1' },
  { label: 'Under Construction', value: '2' },
  { label: 'New Launch', value: '3' },
];

export const furnishingStatus = [
  { label: 'Furnished', value: '1' },
  { label: 'Semi-Furnished', value: '2' },
  { label: 'Un-Furnished', value: '3' },
];
export const postedBy = [
  { label: 'Owner', value: '1' },
  { label: 'Agent', value: '2' },
  { label: 'Builder', value: '3' },
];
export const balconies = [
  { label: '1 Balcony', value: '1' },
  { label: '2 Balconies', value: '2' },
  { label: '3 Balconies', value: '3' },
  { label: '4 Balconies', value: '4' },
  { label: '5 Balconies', value: '5' },
];

export const bhk_type = [
  { label: '1 BHK', value: '1' },
  { label: '2 BHK', value: '2' },
  { label: '3 BHK', value: '3' },
  { label: '4 BHK', value: '4' },
  { label: '5 BHK', value: '5' },
];

export const bad_roomes = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5+', value: '5' },
];

export const ageOfProperty = [
  { label: '0-1 Years', value: '1' },
  { label: '1-5 Years', value: '2' },
  { label: '5-10 Years', value: '3' },
  { label: '10+ Years', value: '4' },
];

export const RentOrSell = [
  { label: 'buy', value: '1' },
  { label: 'rent', value: '2' },
  { label: 'pg', value: '3' },
];

export const Category = [
  { label: 'commercial', value: '1' },
  { label: 'residential', value: '2' },
  { label: 'land', value: '3' },
];

export const Other = [
  { label: 'property', value: '0' },
  { label: 'project', value: '1' },
];

export const menuOptions = {
  RentOrSell: [
    { label: 'Buy', value: '1' },
    { label: 'Rent', value: '2' },
    { label: 'PG', value: '3' },
  ],
  Category: [
    { label: 'Commercial', value: '1' },
    { label: 'Residential', value: '2' },
    { label: 'Land', value: '3' },
  ],
  Other: [
    { label: 'Property', value: '0' },
    { label: 'Project', value: '1' },
  ],
};
export const options = [
  {
    label: 'Buy',
    value: '1',
    category: 'RENTORSELL',
  },
  {
    label: 'Rent',
    value: '2',
    category: 'RENTORSELL',
  },
  {
    label: 'PG',
    value: '3',
    category: 'RENTORSELL',
  },
  {
    label: 'Commercial',
    value: '1',
    category: 'PropertyCategoryID',
  },
  {
    label: 'Residential',
    value: '2',
    category: 'PropertyCategoryID',
  },
  {
    label: 'Land',
    value: '3',
    category: 'PropertyCategoryID',
  },
  {
    label: 'Property',
    value: '0',
    category: 'project_property',
  },
  {
    label: 'Project',
    value: '1',
    category: 'project_property',
  },
];
