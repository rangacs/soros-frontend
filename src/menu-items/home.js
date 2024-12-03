import React from 'react';

// assets
import { IconHome2, IconPinned, IconPin, IconRotateClockwise, IconList } from '@tabler/icons';

// constant
const icons = { IconHome2, IconPinned, IconPin, IconRotateClockwise, IconList };

// ===========================|| DASHBOARD MENU ITEMS ||=========================== //

const home = {
    id: 'home',
    type: 'group',
    visible: ['superadmin', 'admin', 'manager'],
    children: [
        {
            id: 'default',
            title: 'Home',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconHome2,
            breadcrumbs: false
        }
    ]
};

export default home;
