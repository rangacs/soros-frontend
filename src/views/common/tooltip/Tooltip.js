import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    tooltip: {
        position: 'absolute',
        background: 'rgb(0,0,0,0.6)',
        padding: '2px 4px',
        color: 'white',
        borderRadius: '4px',
        fontSize: '12px',
        zIndex: 1000
    }
});
const Tooltip = ({ children, text }) => {
    const classes = useStyles();
    const [showTooltip, setTooltip] = React.useState(false);

    const mouseOver = () => {
        setTooltip(true);
    };
    const mouseOut = () => setTooltip(false);
    return (
        <div onMouseOver={mouseOver} onFocus={mouseOver} onBlur={mouseOut} onMouseOut={mouseOut}>
            {children}
            {showTooltip && <div className={classes.tooltip}> {text}</div>}
        </div>
    );
};

export default Tooltip;
