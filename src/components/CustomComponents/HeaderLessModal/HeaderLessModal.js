import React from 'react';
import { Modal, UnstyledButton } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import style from './headerLessModal.module.css';

function HeaderLessModal({ children, opened = false, close = null, centered = true, fullScreen = false, size = 'sm' }) {
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size={size}
        fullScreen={fullScreen}
        centered={centered}
        classNames={{
          header: style.authForm_modalHeader,
        }}
      >
        <div className={style.customModalBody}>
          <UnstyledButton className={style.modalCloseBtn} onClick={close}>
            <IconX />
          </UnstyledButton>
          {children}
        </div>
      </Modal>
    </>
  );
}

export default HeaderLessModal;
