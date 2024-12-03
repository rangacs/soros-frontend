import React from 'react';
import { sum } from 'lodash';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme, styled } from '@material-ui/styles';
import { Fab, Badge, IconButton } from '@material-ui/core';

// assets
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 0,
        top: 3,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px'
    }
}));

// ===========================|| CART ITEMS - FLOATING BUTTON ||=========================== //

const FloatingCart = () => {
    const theme = useTheme();
    const cart = useSelector((state) => state.cart);
    const totalQuantity = sum(cart.checkout.products.map((item) => item.quantity));

    return (
        <Fab
            component={Link}
            to="/e-commerce/checkout"
            size="large"
            variant="string"
            sx={{
                top: '25%',
                position: 'fixed',
                right: 0,
                zIndex: (theme) => theme.zIndex.speedDial,
                boxShadow: theme.customShadows.warning,
                bgcolor: 'warning.main',
                color: 'warning.light',
                borderRadius: '8px',
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                '&:hover': {
                    bgcolor: 'warning.dark',
                    color: 'warning.light'
                }
            }}
        >
            <IconButton disableRipple aria-label="cart" sx={{ '&:hover': { bgcolor: 'transparent' } }} size="large">
                <StyledBadge showZero badgeContent={totalQuantity} color="error">
                    <ShoppingCartTwoToneIcon sx={{ color: 'grey.800' }} />
                </StyledBadge>
            </IconButton>
        </Fab>
    );
};

export default FloatingCart;
