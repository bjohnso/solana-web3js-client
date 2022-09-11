const test = [
    0x0000,
    0x0001,
    0x007f,
    0x0080,
    0x3fff,
    0x4000,
    0xc000,
    0xffff
];

test.forEach((t) => {
    generateCompactArray(t)
});

function generateCompactArray(num: number) {
    const firstByteThreshold = "0x7f";
    const secondByteThreshold = "0x3fff";

    let compactArray = [];
    let numBytes = 1;

    const binary = padBinaryString(num.toString(2), 16);

    if (num > parseInt(secondByteThreshold, 16)) {
        numBytes = 3;

        compactArray.push(
            parseInt(
                '1' + binary.slice(9, 16),
                2
            ).toString(16),
            parseInt(
                '1' + binary.slice(2, 9),
                2
            ).toString(16),
            parseInt(
                '0' + binary.slice(0, 2),
                2
            ).toString(16),
        );
    } else if (num > parseInt(firstByteThreshold, 16)) {
        numBytes = 2;

        compactArray.push(
            parseInt(
                '1' + binary.slice(9, 16),
                2
            ).toString(16),
            parseInt(
                '0' + binary.slice(2, 9),
                2
            ).toString(16),
        );
    } else {
        compactArray.push(
            parseInt(
                '0' + binary.slice(9, 16),
                2
            ).toString(16),
        );
    }

    console.log({
        num,
        numBytes,
        compactArray
    });
}

function padBinaryString(string: string, length: number) {
    while (string.length < length) {
        string = '0' + string;
    }

    return string;
}

function createMask(a: number, b: number) {
    let r = 0;
    for (let i = a; i <= b; i++) {
        r |= 1 << i;
    }

    return r;
}

function rev(x: number) {
    x = ((x >> 1) & 0x55555555) | ((x & 0x55555555) << 1);
    x = ((x >> 2) & 0x33333333) | ((x & 0x33333333) << 2);
    x = ((x >> 4) & 0x0F0F0F0F) | ((x & 0x0F0F0F0F) << 4);
    x = ((x >> 8) & 0x00FF00FF) | ((x & 0x00FF00FF) << 8);
    x = (x >>> 16) | (x << 16);

    return x >>> 0;
}

