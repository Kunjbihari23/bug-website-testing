import { heading_font_color, primary_green } from '@/constant/FontColotConstant';
import { Notification } from '@mantine/core';
import { title } from 'process';
import React from 'react';

function NotificationPopup({ title = '', color = primary_green }) {
  return (
    <div>
      <Notification color={color} title={title} mt="md"></Notification>
    </div>
  );
}

export default NotificationPopup;
