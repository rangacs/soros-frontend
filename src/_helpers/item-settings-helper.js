import { CHART_SIZE, TABLE_SIZE, CHART_TYPES } from './default-data';

export function getDefaultSize(widgetType) {
    if (widgetType === 'Charts') {
        return CHART_SIZE;
    }
    return TABLE_SIZE;
}

export function currentSize(widgetType, w, h) {
    let findSize;
    if (widgetType === 'Charts') {
        findSize = CHART_SIZE.find((size) => size.value.w === w && size.value.h === h);
    } else {
        findSize = TABLE_SIZE.find((size) => size.value.w === w && size.value.h === h);
    }
    return findSize !== undefined ? findSize : {};
}

export function currentChartType(type) {
    const findType = CHART_TYPES.find((size) => size.value === type);
    return findType !== undefined ? findType : {};
}
