import { Button, Container, Grid, Stack } from '@mantine/core';
import React from 'react';
import style from './banners.module.css';
import Image from 'next/image';
import { HeadingFour, RegularBigFont, SmallFont } from '../TypographyComponent/HeadingComponents';
import CustomePrimaryButton from '@/components/CustomComponents/CustomButtons/CustomButtons';
import { becameAgent } from '@/constant/ImageConstant';
import AuthModal from '../AuthModal/AuthModal';
import { useDisclosure } from '@mantine/hooks';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

function BecameAgentBanner() {
  const { data: sessionClient } = useSession();
  const [AuthOpended, { open: authModalOpen, close: authModalClose }] = useDisclosure(false);

  return (
    <div className={style.section_container}>
      <Container size="xl">
        <div className={style.becameAgent_container}>
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6, md: 4.5 }} order={{ base: 2, sm: 1 }}>
              <div className={style.becameAgent_text_content}>
                <Stack gap={24}>
                  <Stack gap={8}>
                    <HeadingFour fontWeight={600}>Become a Real estate Agent</HeadingFour>
                    <RegularBigFont>
                      Start an exciting career in the field of real estate. Join EasyProps and be an effective,
                      successful, and thriving agent!
                    </RegularBigFont>
                  </Stack>

                  {sessionClient && sessionClient?.user ? (
                    <Link href={'/Client/UserProperty'} className={style.CheckPropertyLink}>
                      Check Your Property
                    </Link>
                  ) : (
                    <CustomePrimaryButton
                      size="large"
                      btnWidth={163}
                      onClick={() => {
                        authModalOpen();
                      }}
                    >
                      Register Now
                    </CustomePrimaryButton>
                  )}
                </Stack>
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 7.5 }} order={{ base: 1, sm: 2 }}>
              <div className={style.becameAgent_img}>
                <Image src={becameAgent} alt="Real estate Agent" height={400} width={780} />
              </div>
            </Grid.Col>
          </Grid>
        </div>
      </Container>

      <AuthModal opened={AuthOpended} close={authModalClose} />
    </div>
  );
}

export default BecameAgentBanner;
