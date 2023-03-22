/*
Criteria
(3): cellTypeIsTextOrEnum + COLUMN_TYPE
(4): All above + round
(5): All above + inlineStyle
(6): All above +  distinct
 */


/*** An object that defines the possible types for a table column.
 * @enum {string}
 */
export const COLUMN_TYPE = { 
    TEXT: 'text',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    DATE: 'date',
    TIME: 'time',
    TIMESPAN: 'timespan',
    CHECKBOX: 'checkbox',
    STATUS: 'status',
    ENUM: 'enum',
    CURRENCY: 'currency'
};

/**
 * Checks if a given cell is of type 'text' or 'enum'.
 * @param {HTMLElement} cell - The cell element to check.
 * @returns {boolean} - `true` if the cell is of type 'text' or 'enum', `false` otherwise.
 */
export function cellTypeIsTextOrEnum(cell) { 
    const cellType = cell.getAttribute('cell-type');
    return cellType == COLUMN_TYPE.TEXT || cellType == COLUMN_TYPE.ENUM;
}

/**
 * Returns the default width (in pixels) for a given column type.
 * @param {string} type - The column type.
 * @returns {number} - The default width (in pixels) for the given column type.
 */
function getDefaultTypeWidth(type) { 
    switch (type) {
        case COLUMN_TYPE.TIME:
        case COLUMN_TYPE.TIMESPAN:
            return 80;
        case COLUMN_TYPE.NUMBER:
        case COLUMN_TYPE.CURRENCY:
            return 90;
        case COLUMN_TYPE.DATE:
            return 130;
        case COLUMN_TYPE.CHECKBOX:
            return 80;
        case COLUMN_TYPE.STATUS:
            return 20;
        default:
            return 44;
    }
}

/**
 * Rounds a number to a specified number of decimal places.
 * @param {number} number - The number to round.
 * @param {number} [decimals=2] - The number of decimal places to round to (default is 2).
 * @returns {number} - The rounded number.
 */
export function round(number, decimals) { 
    if (!decimals)
        decimals = 2;

    return Number(Math.round(number + 'e' + decimals) + 'e-' + decimals);
};

/**
 * Applies inline styles to an element to control its width.
 * @param {HTMLElement} el - The element to apply the styles to.
 * @returns {Object} - An object that contains the inline styles that were applied.
 */

export function inlineStyle(el) { 
    if (!this.width || this.width === 'auto')
        this.width = getDefaultTypeWidth(this.type);

    let style;
    if (this.width == null) {
        style = {};
    } else if (this.scaled) {
        style = {minWidth: `${this.width}px`};
    } else {
        style = {
            minWidth: `${this.width}px`,
            maxWidth: `${this.width}px`
        };
    }

    if(el) {
        el.style.minWidth = style.minWidth;
        el.style.maxWidth = style.maxWidth;
    }

    return style;
}

/**
 * Removes duplicate values from an array.
 * @param {Array} array - The array to remove duplicates from.
 * @param {Function} [selector] - An optional function to select the value to use as the key for identifying duplicates.
 * @returns {Array} - An array that contains only the unique values from the input array.
 * @throws {Error} - Throws an error if the selector function throws an error.
 */
export function distinct(array, selector) { 
    var map = new Map(),
        result = [];

    try {
        for (let i = 0; i < array.length; i++) {
            if (selector) {
                let key = selector(array[i]);

                if (map.has(key))
                    continue;

                result.push(array[i]);
                map.set(key);
            } else if (result.indexOf(array[i]) === -1) {
                result.push(array[i]);
            }
        }

        return result;
    } catch (e) {
        throw new Error(e.message);
    }
}
