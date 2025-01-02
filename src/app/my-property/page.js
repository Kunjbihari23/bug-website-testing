import { HeadingOne, HeadingThree } from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import MyPropertyComponent from '@/components/MyProperty/MyPropertyComponent';
import MainHeader from '@/components/Navbar/MainHeader';
import { getSSRSession } from '@/lib/getSSRSession';
import { Container } from '@mantine/core';

export default async function Page() {
  const { isLoggedIn, user } = await getSSRSession();
  return (
    <>
      <MainHeader search={false} isBlue />
      <Container size={'xl'} pt={50}>
        <HeadingOne>Hello , {user?.userName} &#128075;</HeadingOne>
        <HeadingThree>Your Property Listing &#128071;</HeadingThree>
        <MyPropertyComponent user={user} />
      </Container>
    </>
  );
}
