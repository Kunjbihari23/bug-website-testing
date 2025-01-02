import React, { useState } from 'react';
import style from './agentDetail.module.css';
import {
  HeadingSix,
  RegularBigFont,
  RegularFont,
} from '@/components/CustomComponents/TypographyComponent/HeadingComponents';
import { Badge, Container, Divider, Grid, Group, Pill, Skeleton, Stack } from '@mantine/core';
import { grey_font_color, info_blue_color, lightgrey_font_color } from '@/constant/FontColotConstant';

function AboutAgent({ agentDetail, isPending }) {
  return (
    <>
      <Container size="xl">
        <div className={style.agent_detail_sections}>
          <Grid gutter={40}>
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Stack gap={24}>
                <Stack gap={8}>
                  <Skeleton h={25} w={'40%'} visible={isPending}>
                    <HeadingSix fontWeight={500}>{agentDetail?.userName}</HeadingSix>
                  </Skeleton>
                  {agentDetail?.description && (
                    <Skeleton mah={100} w={'100%'} visible={isPending}>
                      <RegularFont color={lightgrey_font_color}>{agentDetail?.description}</RegularFont>
                    </Skeleton>
                  )}
                </Stack>
                <Group gap={40}>
                  <Stack gap={8}>
                    <Skeleton visible={isPending} h={25}>
                      <RegularFont>{agentDetail?.experience} </RegularFont>
                    </Skeleton>
                    <RegularFont color={lightgrey_font_color}>Experience</RegularFont>
                  </Stack>
                  <Stack gap={8}>
                    <Skeleton visible={isPending} h={25}>
                      <RegularFont>{agentDetail?.totalPropertyCount}</RegularFont>
                    </Skeleton>
                    <RegularFont color={lightgrey_font_color}>Properties</RegularFont>
                  </Stack>
                </Group>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Stack>
                <RegularFont>Areas of Operation</RegularFont>
                <Pill.Group>
                  {agentDetail &&
                  agentDetail.agentAreaOpertaionsViewModel &&
                  agentDetail.agentAreaOpertaionsViewModel.length !== 0 ? (
                    agentDetail.agentAreaOpertaionsViewModel.map((item, index) => (
                      <Pill
                        key={`agent${index}`}
                        size={30}
                        classNames={{ root: style.areaPill_root, label: style.areaPill_label }}
                      >
                        {item.areaOfOpeationName}
                      </Pill>
                    ))
                  ) : (
                    <RegularBigFont color={info_blue_color}>Currently No area Available</RegularBigFont>
                  )}
                </Pill.Group>
              </Stack>
            </Grid.Col>
          </Grid>{' '}
        </div>
        <Divider></Divider>
      </Container>{' '}
    </>
  );
}

export default AboutAgent;
