import EditPropertyComponent from '@/components/AddProperty/PropertyMainSection/EditPropertyComponent';
import MainHeader from '@/components/Navbar/MainHeader';
import { getSSRSession } from '@/lib/getSSRSession';
import { redirect } from 'next/navigation';

export default async function Page({ params }) {
  const { isLoggedIn, user } = await getSSRSession();
  const propertyId = params.propertyId;

  if (!isLoggedIn) {
    redirect('/');
  }

  return (
    <>
      <MainHeader search={false} isBlue />
      <EditPropertyComponent propertyId={propertyId} />
    </>
  );
}
