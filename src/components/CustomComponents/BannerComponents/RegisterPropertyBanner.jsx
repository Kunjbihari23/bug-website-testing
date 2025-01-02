import { Container, Grid, Loader, Stack } from '@mantine/core';
import React, { useState } from 'react';
import style from './banners.module.css';
import Image from 'next/image';
import { registerProperty, whatsappIcon } from '@/constant/ImageConstant';
import {
  HeadingFour,
  RegularBigFont,
  SmallFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import CustomePrimaryButton from '@/components/CustomComponents/CustomButtons/CustomButtons';
import { useSession } from 'next-auth/react';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import AuthModal from '../AuthModal/AuthModal';

function RegisterPropertyBanner() {
  const { data: sessionClient } = useSession();
  const [AuthOpended, { open: authModalOpen, close: authModalClose }] = useDisclosure(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const checkLogin = async () => {
    setIsLoading(true);

    try {
      if (sessionClient?.user) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push('/add-property');
      } else {
        authModalOpen();
      }
    } catch (error) {
      console.log('Error during login check:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={style.section_container}>
      <Container size="xl">
        <div className={style.register_property_container}>
          <div className={style.register_property_sec}>
            <Grid gutter={{ base: 20, md: 40 }}>
              <Grid.Col span={{ base: 12, sm: 5 }} order={{ base: 2, sm: 1 }}>
                <Stack gap={24} classNames={{ root: style.stack_full_root }} justify="center">
                  <Stack gap={8}>
                    <HeadingFour fontWeight={600}>Register to Post Your Property for Free</HeadingFour>
                    <RegularBigFont>Post your Residential / Commercial Property</RegularBigFont>
                  </Stack>
                  <Stack gap={16} className={style.postPropertyBtnWrapper}>
                    <CustomePrimaryButton size="medium" onClick={checkLogin} disabled={isLoading}>
                      {isLoading ? <Loader size={'xs'} /> : 'Post Your Property for Free'}
                    </CustomePrimaryButton>
                    <SmallFont>
                      Or Post your property via{' '}
                      <Image
                        src={whatsappIcon}
                        alt="whatsapp-icon"
                        width={16}
                        height={16}
                        className={style.whatsappIcon}
                      />
                      Whatsapp, send a ‘’hi to <br />
                      <span>+91 92653 20742</span>
                    </SmallFont>
                  </Stack>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 7 }} order={{ base: 1, sm: 2 }}>
                <div className={style.register_property_img}>
                  <Image src={registerProperty} alt="register-property" width={686} height={394} />
                </div>
              </Grid.Col>
            </Grid>
          </div>
        </div>
      </Container>

      <AuthModal opened={AuthOpended} close={authModalClose} />
    </div>
  );
}

export default RegisterPropertyBanner;
