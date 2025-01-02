'use client';

import { Grid } from '@mantine/core';
import styles from './DetailsProperty.module.css';
import Image from 'next/image';
import image40 from '../../../public/img/places/image40.png';
import image41 from '../../../public/img/places/image41.png';
import image42 from '../../../public/img/places/image42.png';
import image43 from '../../../public/img/places/image43.png';
import image45 from '../../../public/img/places/image45.png';

const LocationImageContainer = () => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <Grid>
        <Grid.Col span={6}>
          <Image src={image43} alt="..." className={styles.gridLocationImg} />
        </Grid.Col>
        <Grid.Col span={6}>
          {' '}
          <Image src={image45} alt="..." className={styles.gridLocationImg} />
        </Grid.Col>
        <Grid.Col span={4}>
          {' '}
          <Image src={image42} alt="..." className={styles.gridLocationImg} />
        </Grid.Col>
        <Grid.Col span={4}>
          {' '}
          <Image src={image40} alt="..." className={styles.gridLocationImg} />
        </Grid.Col>
        <Grid.Col span={4}>
          {' '}
          <Image src={image41} alt="..." className={styles.gridLocationImg} />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default LocationImageContainer;
