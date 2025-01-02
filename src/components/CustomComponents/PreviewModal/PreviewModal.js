'use client';
import React from 'react';
import { Modal } from '@mantine/core';
import PreviewImage from '@/components/StaticPages/PreviewImage';
import { IconX } from '@tabler/icons-react';
import style from '../../../../src/components/StaticPages/StaticPages.module.css';

const PreviewModal = ({ opened, close, mediaArr }) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      fullScreen
      centered
      closeButtonProps={{
        icon: <IconX size={40} stroke={1.5} />,
      }}
      className={style.modal_container}
    >
      <PreviewImage images={mediaArr} />
    </Modal>
  );
};

export default PreviewModal;
