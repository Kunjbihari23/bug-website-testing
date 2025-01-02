'use client';
import { Suspense } from 'react';
import BecameAgentBanner from '../CustomComponents/BannerComponents/BecameAgentBanner';
import RegisterPropertyBanner from '../CustomComponents/BannerComponents/RegisterPropertyBanner';
import SelectAdvertisementType from '../CustomComponents/BannerComponents/SelectAdvertisementType';
import StatisticsDetail from '../CustomComponents/BannerComponents/StatisticsDetail';
import TopLinksToSearch from '../CustomComponents/BannerComponents/TopLinksToSearch';
import ViewPropertyBanner from '../CustomComponents/BannerComponents/ViewPropertyBanner';
import TrendingProjects from '../CustomComponents/CommonSlider/TrendingProjects';
import TrustedAgents from '../CustomComponents/CommonSlider/TrustedAgents';
import Footer from '../Footer/Footer';
import DevelopersAndDemand from './DevelopersAndDemand';
import FeatureAndTrendingProjects from './FeatureAndTrendingProjects';
import FilterByProperty from './FilterByProperty';
import HeroFilterBanner from './HeroFilterBanner';
import style from './home.module.css';
import PopularCityService from './PopularCityService';
import SeeAndReadBlog from './SeeAndReadBlog';
import SliderCategoryComponent from './SliderCategoryComponent';
import TopProjectsCommercial from './TopProjectsCommercial';

function Home({ appCity, searchParams }) {
  return (
    <div className={style.homeHeader_section_container}>
      <HeroFilterBanner searchParams={searchParams} appCity={appCity} />
      <FeatureAndTrendingProjects appCity={appCity} searchParams={searchParams} />
      <FilterByProperty appCity={appCity} searchParams={searchParams} />
      <SliderCategoryComponent appCity={appCity} searchParams={searchParams} />
      <StatisticsDetail />
      <TrendingProjects slidesToShow={3} appCity={appCity} searchParams={searchParams} />
      <ViewPropertyBanner searchParams={searchParams} />
      <TopProjectsCommercial appCity={appCity} searchParams={searchParams} />
      {/* <TrustedAgents slidesToShow={3} searchParams={searchParams} /> */}
      <BecameAgentBanner />
      {/* <PopularCityService searchParams={searchParams} /> */}
      <SelectAdvertisementType searchParams={searchParams} />
      {/* <DevelopersAndDemand appCity={appCity} /> */}
      <RegisterPropertyBanner />
      <SeeAndReadBlog searchParams={searchParams} />
      {/* <TopLinksToSearch title={'Browse top links to search your home'} subTitle={'Navigate Top Listings with Ease'} /> */}
      <Footer />
    </div>
  );
}

export default Home;
