"use strict";
// Array
class MyArray {
    constructor(...args) {
        this.length = 0;

        for (const item of args) {
            this[this.length++] = item;
        }
    }

    push(...args) {
        for (const item of args) {
            this[this.length++] = item;
        }
        return this.length;
    }

    pop() {
        const lastElement = this[this.length - 1];
        delete this[this.length - 1];
        --this.length;
        return lastElement;
    }

    concat(arr) {
        let result = new MyArray();
        for (let i = 0; i < this.length; i++) {
            result.push(this[i]);
        }
        for (let i = 0; i < arr.length; i++) {
            result.push(arr[i]);
        }
        return result;
    }

    flat(depth = 1) {
        if (depth < 0) {
            throw new RangeError("depth must be a positive value");
        }

        if (depth === 0) {
            return this;
        }

        let newArr = new MyArray();

        for (let i = 0; i < this.length; i++) {
            if (Array.isArray(this[i])) {
                let buffer = new MyArray(...this[i]);

                newArr = newArr.concat(buffer.flat(depth - 1));
            } else {
                newArr.push(this[i]);
            }
        }
        return newArr;
    }

    shift() {
        if (this.length === 0) {
            return;
        }
        const deletedElement = this[0];
        for (let i = 0; i < this.length; i++) {
            this[i] = this[i + 1];
        }
        delete this[this.length - 1];
        this.length--;
        return deletedElement;
    }

    unshift(...items) {
        const newLength = this.length + items.length;

        for (let i = newLength; i > items.length; i--) {
            this[i - 1] = this[i - items.length - 1];
        }

        for (let i = 0; i < items.length; i++) {
            this[i] = items[i];
            this.length++;
        }
        return this.length;
    }

    [Symbol.iterator]() {
        return new propIterator(this);
    }
}


// LIFO (last in first out)
class Stack {
    constructor(maxSize = 1000) {

        if (typeof maxSize !== "number") {
            throw new TypeError("size must be a number");
        }
        if (maxSize < 1) {
            throw new RangeError("must be a positive number");
        }


        this._maxSize = maxSize;
        this._size = 0;
    }

    get maxSize() {
        return this._maxSize;
    }

    get isEmpty() {
        return this.size === 0;
    }

    get size() {
        return this._size;
    }

    set size(value) {
        this._size = value;
    }


    push(value) {
        if (this.size >= this.maxSize) {
            throw new RangeError("Stack overflow");
        }
        this[this.size++] = value;
        return this.size;
    }

    pop() {
        if (this.isEmpty) {
            return;
        }
        const deletedElement = this[--this.size];
        delete this[this.size];
        return deletedElement;
    }

    peek() {
        if (this.isEmpty) {
            return;
        }
        return this[this.size - 1];
    }
}

//FIFO (first in first out)
class Queue {
    constructor(...args) {
        this._oldIndex = 0;
        this._newIndex = 0;

        for (const item of args) {
            this.push(item);
        }
    }

    get size() {
        return this._newIndex - this._oldIndex;
    }

    push(value) {
        this[this._newIndex++] = value;
        return this.size;
    }

    pop() {
        if (this.size === 0) {
            return;
        }
        const deletedElement = this[this._oldIndex];
        delete this[this._oldIndex++];
        return deletedElement;
    }

    peek() {
        return this[this._oldIndex];
    }
}

// Linked list

class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }
    addNode(value) {
        const node = new ListNode(value);

        if (this.length === 0) {
            this.head = node;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.length++;
    }

    getNodeByIndex(index) {
        if (this.length === 0 || index < 0 || index > this.length) {
            throw new RangeError("Not in list");
        }

        let current = this.head;
        let count = 0;

        while (count < index) {
            current = current.next;
            count++;
        }
        return current;
    }

    [Symbol.iterator]() {
        return new LinkedListIterator(this);
    }
}
class LinkedListIterator {
    constructor(list) {
        this.iterable = list.head;
    }

    next() {
        if (this.iterable) {
            const value = this.iterable.value;
            this.iterable = this.iterable.next; // i++

            return {
                value,
                done: false,
            };
        }
        return { done: true };
    }
}
// iterator for [Symbol.iterator]
class propIterator {

    constructor(structure) {
        this.iterable = structure;
        this.iteration = 0;
    }

    next() {
        return {
            value: this.iterable[this.iteration++],
            done: this.iteration > this.iterable.length,
        };
    }
}

