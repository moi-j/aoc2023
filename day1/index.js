const { log, assert } = require('console');
const fs = require('fs');

const allFileContents = fs.readFileSync('./day1/input.txt', 'utf-8');
const stringNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const numbers = [1,2,3,4,5,6,7,8,9];
const validDigits = [...stringNumbers, ...numbers];

const result = allFileContents.split(/\r?\n/).reduce((accumulator, current) =>  {
    const firstFind = {idx: null, value: null};
    const lastFind = {idx: null, value: null};

    validDigits.forEach( (vd, idx) => {
        const lastIndex = current.lastIndexOf(vd);
        const firstIndex = current.indexOf(vd);
        const numericValue = idx < 9 ? numbers[idx] : vd;
        const elementWasFound = lastIndex >= 0;
        
        if(elementWasFound) {
            if(firstFind.idx === null && lastFind.idx === null) {
                firstFind.idx = firstIndex;
                firstFind.value = numericValue;
                lastFind.idx = lastIndex;
                lastFind.value = numericValue;
            } else {
                setFirstFind();
                setLastFind();
            }
        }

        function setLastFind() {
            if (lastIndex > lastFind.idx) {
                lastFind.idx = lastIndex;
                lastFind.value = numericValue;
            }
            if (firstIndex > lastFind.idx) {
                lastFind.idx = firstIndex;
                lastFind.value = numericValue;
            }
        }

        function setFirstFind() {
            if (lastIndex < firstFind.idx) {
                firstFind.idx = lastIndex;
                firstFind.value = numericValue;
            }
            if (firstIndex < firstFind.idx) {
                firstFind.idx = firstIndex;
                firstFind.value = numericValue;
            }
        }
    });
    const currentValue = Number(`${firstFind.value}${lastFind.value}`);
    return accumulator + currentValue;
}, 0);

console.log(result);
