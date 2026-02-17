/* eslint-disable require-jsdoc */

'use strict';

QUnit.module("Тестируем функцию partition", function() {
    QUnit.test("Возвращает пустой массив при пустом массиве", function(assert) {
        const result = partition([], num => num < 3);
        assert.deepEqual(result, [[], []]);
    });
    
    QUnit.test("Работает правильно при разделении массива на основе предиката", function(assert) {
        const isEven = num => num % 2 === 0;
        const result = partition([1, 2, 3, 4, 5, 6], isEven);

        assert.deepEqual(result, [
            [2, 4, 6],
            [1, 3, 5]
        ]);
    });

    QUnit.test("Работает правильно при разделении с предикатом, возвращающим true для всех элементов", function(assert) {
        const isPositive = num => num > 0;
        const result = partition([1, 2, 3, 4, 5], isPositive);

        assert.deepEqual(result, [
            [1, 2, 3, 4, 5],
            []
        ]);
    });

    QUnit.test("Работает правильно при разделении с предикатом, возвращающим false для всех элементов", function(assert) {
        const isNegative = num => num < 0;
        const result = partition([1, 2, 3, 4, 5], isNegative);

        assert.deepEqual(result, [
            [],
            [1, 2, 3, 4, 5]
        ]);
    });

    QUnit.test("Правильно делит массив объектов по свойству", function(assert) {
        const isAdult = person => person.age >= 18;
        const result = partition([
            { name: "Alice", age: 17 },
            { name: "Bob", age: 20 },
            { name: "Charlie", age: 15 },
            { name: "David", age: 22 }
        ], isAdult);
        assert.deepEqual(result, [
            [
                { name: "Bob", age: 20 },
                { name: "David", age: 22 }
            ],
            [
                { name: "Alice", age: 17 },
                { name: "Charlie", age: 15 }
            ]
        ]);
    });

    QUnit.test("Не меняет порядок объектов", function(assert) {
        const predicate = num => num < 3;
        const result = partition([-3, 20, 2, 15], predicate);
        assert.deepEqual(result, [[-3, 2], [20, 15]]);
    });

    QUnit.test("Не изменяет изначальный массив", function(assert) {
        const predicate = num => num < 3;
        const arr = [-3, 20, 2, 15]
        const result = partition(arr, predicate);
        assert.deepEqual(arr, [-3, 20, 2, 15]);
    });

    QUnit.test("Выдает ошибку при неправильном предикате", function(assert) {
        const predicate = 'this is a predicate';
        assert.throws(() => partition([1, 2, 3], predicate), TypeError);
    });

    QUnit.test("Выдает ошибку при неправильном массиве", function(assert) {
        const arr = 'this is an array';
        assert.throws(() => partition(arr, num => num < 3), TypeError);
    });
});
