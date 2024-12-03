import React from 'react';

// assets
import { IconPinned, IconPin } from '@tabler/icons';

// constant
const icons = { IconPinned, IconPin };

// ===========================|| DASHBOARD MENU ITEMS ||=========================== //

const pinned = {
    id: 'pinned',
    // title: "Details" />,
    type: 'group',
    children: [
        {
            id: 'pinned',
            title: 'Pinned',
            type: 'collapse',
            icon: icons.IconPinned,
            children: [
                {
                    id: 'CompaniesName',
                    title: 'Companies-Name',
                    type: 'item',
                    icon: icons.IconPin,
                    url: '/user/companies-name/posts'
                }
            ]
        }
    ]
};

export default pinned;
