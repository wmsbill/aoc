function parse(filename: string): [number, number[]][] {
    return Deno.readTextFileSync(filename)
        .split("\n")
        .map((line) => {
            const [result, list] = line.split(":").map((str) => str.trim());
            const numbers = list.split(" ").map(Number);

            return [Number(result), numbers];
        });
}

function hasValidMath(
    result: number,
    numbers: number[],
    acc: number = 0,
    shouldConcat: boolean = false,
): boolean {
    if (numbers.length === 0) {
        return acc === result;
    }

    if (acc > result) {
        return false;
    }

    const [first, ...rest] = numbers;
    const sum = acc + first;
    const mul = acc * first;
    const concat = Number(acc.toString() + first.toString());

    return hasValidMath(result, rest, mul, shouldConcat) ||
        hasValidMath(result, rest, sum, shouldConcat) ||
        (shouldConcat && hasValidMath(result, rest, concat, shouldConcat));
}

function solution1(filename: string) {
    const data: [number, number[]][] = parse(filename);

    console.info(filterValidMath(data));
}

function filterValidMath(
    data: [number, number[]][],
    shouldConcat: boolean = false,
) {
    return data
        .filter(([result, numbers]) =>
            hasValidMath(result, numbers, 0, shouldConcat)
        )
        .reduce(
            (acc, [result]) => acc + result,
            0,
        );
}

function solution2(filename: string) {
    const data: [number, number[]][] = parse(filename);

    console.info(filterValidMath(data, true));
}

// solution1("test.txt");
// solution1("input.txt");

// solution2("test.txt");
solution2("input.txt");
