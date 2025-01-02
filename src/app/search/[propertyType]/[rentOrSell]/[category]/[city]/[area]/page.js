import Search from '@/components/SearchPage/Search';
import styles from '../../../../../../page.module.css';
import { getSSRSession } from '@/lib/getSSRSession';

async function page({ params, searchParams }) {
  const { isLoggedIn, user } = await getSSRSession();
  return (
    <div className={styles.homepage_main_container}>
      <Search isUserLoggedIn={isLoggedIn} user={user} searchParams={searchParams} params={params} />
    </div>
  );
}

export default page;
