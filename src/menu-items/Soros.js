import React from 'react';

// assets
import { IconTag, IconTags } from '@tabler/icons';

import { Money, Timeline, Build } from '@material-ui/icons';

// ===========================|| DASHBOARD MENU ITEMS ||=========================== //

const Soros = {
    id: 'soros',
    // title: 'Soros',
    type: 'group',
    visible: ['superadmin', 'admin', 'manager', 'operator'],
    children: [
        {
            id: 'Monitor',
            title: 'Monitor',
            type: 'item',
            url: '/soros/monitor',
            icon: Money,
            breadcrumbs: false
        },
        {
            id: 'Tag',
            title: 'Tag',
            type: 'item',
            url: '/soros/tag/all',
            icon: IconTag,
            breadcrumbs: false
        },
        {
            id: 'Tag Group',
            title: 'Tag Group',
            type: 'item',
            url: '/soros/tagGroup',
            icon: IconTags,
            breadcrumbs: false
        },
        {
            id: 'Plot',
            title: 'Plot',
            type: 'item',
            url: '/soros/plot',
            icon: Timeline,
            breadcrumbs: false
        },
        {
            id: 'configure',
            title: 'configure',
            type: 'item',
            url: '/soros/setpoints',
            icon: Build,
            breadcrumbs: false
        }
    ]
};

export default Soros;
