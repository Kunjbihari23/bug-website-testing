import React, { Suspense, useState } from 'react';
import style from './agentDetail.module.css';
import {
  HeadingFour,
  HeadingSix,
  RegularFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
// import Image from 'next/image';
import { agent1, agent2, verifyIcon, tickIcon, defaultUserImg } from '@/constant/ImageConstant';
import { Anchor, Badge, Center, Container, Divider, Grid, Group, Skeleton, Stack, Tabs } from '@mantine/core';
import { grey_font_color, lightgrey_font_color, primary_color } from '@/constant/FontColotConstant';
import AboutAgent from './AboutAgent';
import ActiveProperty from './ActiveProperty';
import ContactAgentForm from '@/components/CustomComponents/FormContainer/ContactAgentForm';
import CustomePrimaryButton from '../CustomComponents/CustomButtons/CustomButtons';
import { useAgentDetailApi } from '@/state/agent/Agent.hook';
import NextImage from 'next/image';
import { Image } from '@mantine/core';
import Link from 'next/link';

function AgentInfo({ agentId, searchParams }) {
  const { data: agentDetail, isPending } = useAgentDetailApi(agentId);

  const [activeTab, setActiveTab] = useState('about_agent');

  return (
    <>
      <div className={style.agentDetail_mainContainer}>
        <Container size="xl">
          <div className={style.agent_detail_sections}>
            <div className={style.agentDetail_mainTitle}>
              <HeadingFour fontWeight={600}>Agent Details</HeadingFour>
            </div>
            <div className={style.agentDetail_infoContainer}>
              <Group gap={40}>
                {isPending ? (
                  <Skeleton visible={isPending} width={192} height={200} />
                ) : (
                  <Image
                    component={NextImage}
                    src={agentDetail?.profileImage}
                    alt={agentDetail?.userName}
                    width={192}
                    height={200}
                    maw={192}
                    fallbackSrc={defaultUserImg}
                  />
                )}

                <Stack gap={20} classNames={{ root: style.stack_root }}>
                  <Stack gap={10}>
                    <Skeleton visible={isPending} h={30} miw={50}>
                      <Group gap={6} wrap="nowrap">
                        <HeadingSix fontWeight={500}>{agentDetail?.userName}</HeadingSix>
                        <Image component={NextImage} src={verifyIcon} alt="verify-agent" width={24} height={24} />
                      </Group>
                    </Skeleton>
                    <Group gap={10}>
                      <Group gap={5} wrap="nowrap">
                        <Skeleton visible={isPending} h={25} miw={15}>
                          <RegularFont fontWeight={500}>{agentDetail?.experience}</RegularFont>
                        </Skeleton>
                        <RegularFont color={lightgrey_font_color}>Experience</RegularFont>
                      </Group>
                      <Divider orientation="vertical" />
                      <Group gap={5} wrap="nowrap">
                        <Skeleton visible={isPending} h={25} miw={15}>
                          <RegularFont fontWeight={500}>{agentDetail?.totalPropertyCount}</RegularFont>
                        </Skeleton>
                        <RegularFont color={lightgrey_font_color}>Properties</RegularFont>
                      </Group>
                    </Group>
                    {isPending ? (
                      <Skeleton h={20} width={'50%'} />
                    ) : (
                      agentDetail?.company_name && (
                        <Group gap={5}>
                          <RegularFont fontWeight={500}>Company Name :</RegularFont>
                          <Group gap={10}>
                            <RegularFont color={lightgrey_font_color}>{agentDetail?.company_name}</RegularFont>{' '}
                            <Divider orientation="vertical" />
                            <RegularFont color={lightgrey_font_color}>OWNER </RegularFont>
                          </Group>
                        </Group>
                      )
                    )}
                  </Stack>

                  <Grid classNames={{ root: style.grid_root, inner: style.agentGrid_inner }}>
                    <Grid.Col span={{ base: 12, sm: 9 }}>
                      <Grid mt={20} classNames={{ root: style.grid_root }}>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Stack gap={8}>
                            <Group gap={8}>
                              <Image component={NextImage} src={tickIcon} alt="list-tick" width={16} height={16} />
                              <RegularFont color={lightgrey_font_color}>500+ Buyers Served</RegularFont>
                            </Group>
                            <Group gap={8}>
                              <Image component={NextImage} src={tickIcon} alt="list-tick" width={16} height={16} />
                              <RegularFont color={lightgrey_font_color}>Trusted Agent</RegularFont>
                            </Group>
                          </Stack>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Stack gap={8}>
                            <Group gap={8}>
                              <Image component={NextImage} src={tickIcon} alt="list-tick" width={16} height={16} />
                              <RegularFont color={lightgrey_font_color}>Authentic Listings</RegularFont>
                            </Group>
                            <Group gap={8}>
                              <Image component={NextImage} src={tickIcon} alt="list-tick" width={16} height={16} />
                              <RegularFont color={lightgrey_font_color}>Highly Professional</RegularFont>
                            </Group>
                          </Stack>
                        </Grid.Col>
                      </Grid>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 3 }}>
                      <CustomePrimaryButton component={Link} href="#ContactAgentForm" size="small">
                        Contact Agent
                      </CustomePrimaryButton>
                    </Grid.Col>
                  </Grid>
                </Stack>
              </Group>
            </div>
          </div>
        </Container>
      </div>
      <div className={style.agentInfo_tab_container}>
        <Tabs
          value={activeTab}
          color={primary_color}
          onChange={setActiveTab}
          classNames={{ tab: style.agentInfo_tabButton, list: style.agentInfo_tabList }}
        >
          <div className={style.agent_tabListBox}>
            <Container size="xl">
              <Tabs.List>
                <Tabs.Tab value="about_agent">
                  <Anchor href="#about_agent" underline="never" c={grey_font_color}>
                    About Agent
                  </Anchor>
                </Tabs.Tab>
                <Tabs.Tab value="active_properties">
                  <Anchor href="#active_properties" underline="never" c={grey_font_color}>
                    Active Properties
                  </Anchor>
                </Tabs.Tab>
              </Tabs.List>
            </Container>
          </div>
          <div id="about_agent">
            <AboutAgent agentDetail={agentDetail} isPending={isPending} />
          </div>
          <div id="active_properties">
            {/* <Suspense> */}
            <ActiveProperty agentDetail={agentDetail} isPending={isPending} searchParams={searchParams} />
            {/* </Suspense> */}
          </div>
        </Tabs>
      </div>
      <div className={style.contact_fomrContainer} id="ContactAgentForm">
        <Container size="xl">
          <Center>
            <ContactAgentForm agentDetail={agentDetail} isPending={isPending} />
          </Center>
        </Container>
      </div>
    </>
  );
}

export default AgentInfo;
