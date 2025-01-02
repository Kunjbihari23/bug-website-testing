import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import Home from '../components/HomePage/Home.js';
import MainHeader from '../components/Navbar/MainHeader.jsx';
import styles from './page.module.css';
import { getCitylistApi } from '@/state/cityList/citylist.api.js';
import { getCookie } from '@/instance/getTokenFromServer.js';

export default async function page({ searchParams }) {
  const queryClient = new QueryClient();

  let appCity;
  const cookieValue = getCookie('selected_city');

  if (cookieValue) {
    try {
      appCity = JSON.parse(cookieValue);
    } catch (error) {
      console.error('Error parsing cookie value:', error);
      appCity = {
        label: 'Ahmedabad',
        value: 153,
      };
    }
  } else {
    appCity = {
      label: 'Ahmedabad',
      value: 153,
    };
  }

  await queryClient.prefetchQuery({
    queryKey: ['citylist'],
    queryFn: () => getCitylistApi(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={styles.homepage_main_container}>
        <MainHeader search={false} />
        <Home appCity={appCity} searchParams={searchParams} />
      </div>
    </HydrationBoundary>
  );
}
