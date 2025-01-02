const API = {
  auth: {
    login: '/Authentication/Login',
    signup: '/User/SignUP',
    postOtp: '/Authentication/OtpVerify',
    resendOtp: '/User/ResendOtp',
  },
  cityList: {
    city: '/Master/CityList?PageNumber=1&PageSize=250&currentPage=0',
  },
  localityList: {
    local: '/Master/LocalityList/',
    popularLocalityApi: '/Master/PopularLocality',
  },
  propertyType: {
    property: '/Home/PropertyTypeList',
  },
  recentlyPostedProperty: {
    postedProperty: '/Home/RecentlyPostedPropertiesList',
  },
  searchList: {
    search: '/Home/PropertySearch',
    propertyTypeList: '/Master/PropertyCategoryList',
    subPropertyList: '/Master/GetsubcatAndCategories',
    subPropertyFilterList: '/Properties/PropertySubCategoryList',
  },

  propertyAvaibilityList: '/Properties/PropertyAvaibilityList',

  highDemanadProject: {
    projectDemand: '/Home/ProjectsInHighDemand',
  },
  bhkChoice: {
    bhkChoiceApi: '/Home/BHKCHOICE',
  },
  statisticCount: { statistics: '/Home/StaticsCount' },
  featureCollections: {
    fetureCollect: '/Home/ProjectFeaturedCollections',
  },
  trendingProjects: {
    trenidngProject: '/Home/TrendingProjects',
  },
  topProjectApi: {
    topProject: '/Home/TopProjects',
  },
  blog: {
    blogList: '/Master/BlogList',
    blogDetail: '/Master/BlogDetail',
  },
  popularCitiesProperty: '/home/PopularCitiesList',
  agents: {
    agentsList: '/Home/AgentList',
    agentDetail: '/User/AgentDetail',
    agentPropertyList: '/User/AgentPropertiesList',
  },
  PropertyDetail: '/Properties/PropertyDetail',
  PropertyNewDetails: '/Properties/PropertyDetailForUser',
  PopularLocalitywithCity: '/Master/PopularLocalitywithCity',
  subLocalityList: '/Master/LocalityList',
  faq: '/Master/FaqList',
  setting: '/Home/Setting',
  propertyInquiry: '/Properties/inquiry',
  addProperty: {
    addProperty: '/Properties/AddProperty',
    propertyCategoryList: '/Master/PropertyCategoryList?propertyid=0',
    subCategoryList: '/Properties/PropertySubCategoryList?CatID=',
    unenableDisable: '/Master/GetpropsenableddisabledList',
    multipleSubCategoryList: '/Properties/PropertyMultipleSubCategoryList',
    placeNearBy: '/Master/GetPlaceNearby',
    Amenities: '/Master/GetPropertySubCategoryAmenities',
    FacingDirection: '/Master/FacingList',
  },
  propertyList: {
    getList: '/Properties/UserPropertyList',
  },
  contact: {
    inquiry: '/Master/AddFaqContactInquiry',
  },
  contactSanctum: {
    inquiry: 'User/CampaignEnquiry',
  },
  amenityMaster: '/Master/AmenitiesList',
  subCategoryAmenityMaster: '/Master/GetPropertySubCategoryAmenities',
  addProject: '/Project/AddProject',
  userData: {
    getUserDetail: '/User/GetUserProfileDetail',
    updateUserDetail: '/User/UpdateUserProfile',
    userProperty: '/Properties/UserPropertyList',
    userPropertyInquiry: '/Properties/GetPropertyinquery',
    DashboardCount: '/Project/DashboardCount',
    TopvisitProperty: '/Properties/Topvisitproperty',
    FavoriteProperty: '/Properties/UserFavoritepropertyListings',
    BoosterProperty: '/Properties/UserBoosterproperty',
    favoriteProperty: '/Properties/AddPropertyFavorite',
    favoriteProject: '/Project/AddProjectFavorite',
    deleteFavouriteProperty: '/Properties/DeletePropertyFavorite',
    deleteFavouriteProject: '/Project/DeleteProjectFavorite',
  },
};
export default API;
