import { cloneDeep } from 'lodash';
import { CHART, TABLE } from './default-data';
import { toast } from 'react-toastify';

export function modifyWidgetSettings(item, prevItems) {
    if (item && prevItems.length > 0) {
        const lastItem = prevItems[prevItems.length - 1];
        if (lastItem) {
            const lastItemWidth = lastItem.settings.layout.w;
            if (lastItemWidth !== 24) {
                const lastItemXPosition = lastItem.settings.layout.x;
                if (lastItemXPosition === 0) {
                    item.settings.layout.x = lastItemWidth;
                } else {
                    const remainingWidth = +lastItem.settings.layout.x + +lastItem.settings.layout.w;
                    if (remainingWidth === 24) {
                        item.settings.layout.x = 0;
                    } else {
                        // eslint-disable-next-line no-lonely-if
                        if (24 - remainingWidth < item.settings.layout.w) {
                            item.settings.layout.x = 0;
                        } else {
                            item.settings.layout.x = 24 - lastItem.settings.layout.w;
                        }
                    }
                }
            }
        }
    }
    return item;
}

export function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export function widgetsReducer(state, action) {
    if (action.type === 'ADD_WIDGET') {
        if (action.widgetType === 'Node') {
            if (state.find((item) => item.type === 'Node') !== undefined) {
                toast.error('Node widget exists!');
                return state;
            }
        }

        let item;
        const widgetType = action.widgetType;
        if (widgetType === 'chart') {
            item = cloneDeep(CHART);
            item.widgetId = Math.random();
        }

        if (widgetType === 'table') {
            item = cloneDeep(TABLE);
            item.widgetId = Math.random();
        }

        item = modifyWidgetSettings(item, state);

        if (item !== undefined) {
            if (widgetType === 'Node') {
                return [item, ...state];
            }
            return [...state, item];
        }
        return [...state];
    }

    if (action.type === 'UPDATE_WIDGET_POSITIONS') {
        const existingDashboardItems = cloneDeep(state);
        action.newLayout.forEach((l) => {
            const indexOfDashboardItem = existingDashboardItems.findIndex((item) => item.widgetId.toString() === l.i);
            if (indexOfDashboardItem !== -1) {
                existingDashboardItems[indexOfDashboardItem].settings.layout.x = l.x;
                existingDashboardItems[indexOfDashboardItem].settings.layout.y = l.y;
                existingDashboardItems[indexOfDashboardItem].settings.layout.w = l.w;
                existingDashboardItems[indexOfDashboardItem].settings.layout.h = l.h;
            }
        });
        return existingDashboardItems;
    }

    if (action.type === 'DELETE_WIDGET') {
        const newDashboardItems = state.filter((item) => item.widgetId !== action.id);
        newDashboardItems.forEach((item, index) => {
            const itemLayout = item.settings.layout;
            if (index === 0) {
                itemLayout.x = 0;
            }
            if (index > 0) {
                const previousItem = newDashboardItems[index - 1].settings.layout;
                const previousItemSize = previousItem.x + previousItem.w;
                if (previousItemSize < 24) {
                    itemLayout.x = previousItemSize;
                } else {
                    itemLayout.x = 0;
                }
            }
        });
        return newDashboardItems;
    }

    if (action.type === 'CLONE_WIDGET') {
        const existingDashboardItem = state.filter((item) => item.widgetId === action.id);
        let newDashboardItem = cloneDeep(existingDashboardItem[0]);
        newDashboardItem.widgetId = Math.random();
        newDashboardItem.settings.layout.y = Infinity;
        newDashboardItem = modifyWidgetSettings(newDashboardItem, state);
        return [...state, newDashboardItem];
    }

    if (action.type === 'UPDATE_ACTIVE_WIDGET') {
        const existingDashboardItems = cloneDeep(state);
        const existingDashboardItem = existingDashboardItems.findIndex((item) => item.widgetId === action.activeWidget.widgetId);
        existingDashboardItems[existingDashboardItem] = action.activeWidget;
        return existingDashboardItems;
    }

    if (action.type === 'UPDATE_LAYOUT') {
        return action.layout;
    }

    return state;
}

/* export function tableCellStyling(field, value, spValue) {
    if (spValue[field]) {
        const puLimit = (spValue[field].U_LIMIT / 100) * 10,
            plLimit = (spValue[field].L_LIMIT / 100) * 10,
            uLimit = spValue[field].U_LIMIT + puLimit,
            lLimit = spValue[field].L_LIMIT - plLimit;
        if (value > uLimit || value < lLimit) {
            //danger-limit
            return { backgroundColor: '#ffe2e5', color: '#000' };
        } else if (
            (value <= spValue[field].U_LIMIT + puLimit && value >= spValue[field].U_LIMIT) ||
            (value <= spValue[field].L_LIMIT + plLimit && value >= spValue[field].L_LIMIT)
        ) {
            //warning-limit
            return { backgroundColor: '#fff4de', color: '#000' };
        } else {
            //in-limit
            return { backgroundColor: '#c9f7f5', color: '#000' };
        }
    }
    return { backgroundColor: 'inherit', color: 'inherit' };
} */
