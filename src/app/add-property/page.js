import AddPropertyComponent from '@/components/AddProperty/PropertyMainSection/AddPropertyComponent';
import MainHeader from '@/components/Navbar/MainHeader';

export default function Page() {
  return (
    <>
      <MainHeader search={false} isBlue />
      <AddPropertyComponent />
    </>
  );
}
