function inputToArray(data: string) {
    const number1: number[] = [];
    const number2: number[] = [];

    data.split("\n")
        .map((x) => x.split("   "))
        .forEach((x: string[]) => {
            number1.push(parseInt(x[0]));
            number2.push(parseInt(x[1]));
        });

    return [number1, number2];
}

function solution1(filename: string) {
    const data = Deno.readTextFileSync(filename);
    const [number1, number2] = inputToArray(data).map((x) =>
        x.sort((a, b) => a - b)
    );

    let result = 0;

    for (let i = 0; i < number1.length; i++) {
        result += Math.abs(number1[i] - number2[i]);
    }

    console.log(result);
}

function solution2(filename: string) {
    const data = Deno.readTextFileSync(filename);
    const array: number[] = [];
    const map = new Map<number, number>();

    data.split("\n")
        .map((x) => x.split("   ").map((x) => parseInt(x)))
        .forEach((x) => {
            array.push(x[0]);
            map.set(x[1], (map.get(x[1]) || 0) + 1);
        });

    let result = 0;

    for (const item of array) {
        if (map.has(item)) {
            result += item * map.get(item)!;
        }
    }

    console.log(result);
}

// solution1('test.txt');
// solution1("input.txt");

// solution2("test.txt");
solution2("input.txt");
