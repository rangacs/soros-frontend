import React from 'react';

// assets
import { IconRotateClockwise, IconList } from '@tabler/icons';

// constant
const icons = { IconRotateClockwise, IconList };

// ===========================|| DASHBOARD MENU ITEMS ||=========================== //

const recent = {
    id: 'recent',
    // title: "Details" />,
    type: 'group',
    children: [
        {
            id: 'Recent',
            title: 'Recent',
            type: 'collapse',
            icon: icons.IconRotateClockwise,
            children: [
                {
                    id: 'CompaniesName',
                    title: 'Companies-Name',
                    type: 'item',
                    icon: icons.IconList,
                    url: '/user/companies-name/posts'
                }
            ]
        }
    ]
};

export default recent;
