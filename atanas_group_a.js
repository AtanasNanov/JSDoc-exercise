/*
Criteria
(3): cellTypeIsTextOrEnum + COLUMN_TYPE
(4): All above + round
(5): All above + inlineStyle
(6): All above +  distinct
 */


export const COLUMN_TYPE = { /* constant object that defines several column types  */
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


export function cellTypeIsTextOrEnum(cell) { /* function that takes a cell element as an argument and returns a boolean indicating whether the cell's type is TEXT or ENUM */
    const cellType = cell.getAttribute('cell-type');
    return cellType == COLUMN_TYPE.TEXT || cellType == COLUMN_TYPE.ENUM;
}

function getDefaultTypeWidth(type) { /* function that returns the default width for a column type and returns a number representing the default width for the column type*/
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

export function round(number, decimals) { /* function that rounds a number to the specified number of decimal points and returns the rounded number according to the decimal points specified */
    if (!decimals)
        decimals = 2;

    return Number(Math.round(number + 'e' + decimals) + 'e-' + decimals);
};

export function inlineStyle(el) { /* function that generates inline CSS style for an element based on its width and type. generates inline CSS to the element specified (el)*/
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


export function distinct(array, selector) { /* function that removes duplicate values from an array and creates another array containing only the unique values from it */
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
