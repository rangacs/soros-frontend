import React from 'react';

// assets
import { IconPinned, IconPin } from '@tabler/icons';

// constant
const icons = { IconPinned, IconPin };

// ===========================|| DASHBOARD MENU ITEMS ||=========================== //

const TagManagement = {
    id: 'tagManagement',
    type: 'group',
    visible: ['superadmin'],
    children: [
        {
            id: 'Consolidations',
            title: 'Tag Management',
            type: 'collapse',
            icon: icons.IconPinned,
            breadcrumbs: false,
            children: [
                {
                    id: 'Tag',
                    title: 'Tag',
                    type: 'item',
                    url: '/tag',
                    icon: icons.IconPinned,
                    breadcrumbs: false
                },
                {
                    id: 'Tag Group',
                    title: 'Tag Group',
                    type: 'item',
                    url: '/tagGroup',
                    icon: icons.IconPinned,
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default TagManagement;
