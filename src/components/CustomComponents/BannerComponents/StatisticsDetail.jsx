import React from 'react';
import { Button, Card, Container, Grid, Group, Skeleton, Stack, Text, em } from '@mantine/core';
import style from './banners.module.css';
import { useMediaQuery } from '@mantine/hooks';
import { useStatisticHook } from '@/state/HomePageAPis/homePageApisHook';

function StatisticsDetail() {
  const isDesktop = useMediaQuery(`(max-width: ${em(992)})`);

  const { data: statisticCount, isLoading } = useStatisticHook();

  return (
    <div className={style.section_container}>
      <div className={style.StatisticsDetail_container}>
        <Container size="lg">
          <Group grow gap={0} justify="center" wrap={isDesktop ? 'wrap' : 'nowrap'}>
            <div className={style.stattic_box}>
              <Skeleton visible={isLoading} w={'100%'}>
                <span className={style.stattic_count}>{statisticCount?.projectCount}+</span>
                <span>Project Added</span>
              </Skeleton>

            </div>
            <div className={style.stattic_box}>
              <Skeleton visible={isLoading} w={'100%'}>
                <span className={style.stattic_count}>{statisticCount?.agentCount}+</span>
                <span>Agents Listed</span>
              </Skeleton>
            </div>
            <div className={style.stattic_box}>
              <Skeleton visible={isLoading} w={'100%'}>
                <span className={style.stattic_count}>{statisticCount?.propertyCount}+</span>
                <span>Property Added</span>
              </Skeleton>
            </div>
            <div className={style.stattic_box}>
              <Skeleton visible={isLoading} w={'100%'}>
                <span className={style.stattic_count}>{statisticCount?.usersCount}+</span>
                <span>Users</span>
              </Skeleton>
            </div>
          </Group>
        </Container>
      </div>
    </div>
  );
}

export default StatisticsDetail;
