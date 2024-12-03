import React from 'react';
import { useLocation } from 'react-router-dom';

// material-ui
import { Typography } from '@material-ui/core';

import { getStorageData } from 'utils/auth/auth';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ===========================|| SIDEBAR MENU LIST ||=========================== //
const MenuList = () => {
    const { pathname } = useLocation();
    const userData = getStorageData();
    // eslint-disable-next-line array-callback-return
    const navItems = menuItem.items
        .filter((obj) => pathname.includes(obj.id))
        .map((item) => {
            switch (item.type) {
                case 'group':
                    if (item.visible.includes(userData.user.role)) {
                        return <NavGroup key={item.id} item={item} />;
                    }
                    return <></>;
                    // eslint-disable-next-line no-unreachable
                    break;
                // eslint-disable-next-line no-fallthrough
                default:
                    return (
                        <Typography key={item.id} variant="h6" color="error" align="center">
                            Menu Items Error
                        </Typography>
                    );
            }
        });

    return navItems;
};

export default MenuList;
