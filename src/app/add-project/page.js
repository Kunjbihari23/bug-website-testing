import AddProjet from '@/components/AddProject/ProjectMainSection/AddProjet';
import Footer from '@/components/Footer/Footer';
import MainHeader from '@/components/Navbar/MainHeader';

export default function Page() {
  return (
    <>
      <MainHeader search={false} isBlue />
      <AddProjet />
      <Footer />
    </>
  );
}
