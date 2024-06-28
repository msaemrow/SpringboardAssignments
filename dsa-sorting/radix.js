function radixSort(arr) {
    const max = Math.max(...arr);
    const maxDigits = Math.floor(Math.log10(max)) +1;

    for(let digit = 0; digit < maxDigits; digit++){
        let buckets = Array.from({length: 10}, () => []);

        for(let number of arr){
            const digitValue = Math.floor(number/Math.pow(10, digit)) % 10;
            buckets[digitValue].push(number);
        }
        arr=buckets.flat();
    }
    return arr;
}

module.exports = {radixSort};