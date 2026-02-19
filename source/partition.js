'use strict';

/**
 * Функция, разделяющая массив на два подмассива по условию
 * @param {Array} array - массив значений
 * @param {Function} predicate - условие разделения
 *
 * @example
 * // returns [[1, 2], [3]]
 * partition([1, 2, 3], num => num < 3);
 *
 * @returns {[Array, Array]}
 */

const partition = (array, predicate) => {
    if (!Array.isArray(array)) {
        throw new TypeError('array must be an array');
    }
    if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
    }

    return array.reduce((acc, item) => {
        acc[predicate(item) ? 0 : 1].push(item);
        return acc;
    }, [[], []]);
}
