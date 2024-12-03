//

function solution1(filename: string) {
    const data = Deno.readTextFileSync(filename);
    const pattern = /mul\((\d+),(\d+)\)/g;

    let acc = 0;

    for (const [_, num1, num2] of data.matchAll(pattern)) {
        acc += parseInt(num1) * parseInt(num2);
    }

    console.log(acc);
}

function solution2(filename: string) {
    const data = Deno.readTextFileSync(filename);
    const pattern = /mul\((\d+),(\d+)\)|don't\(\)|do\(\)/g;

    let acc = 0;
    let shouldProcess = true;

    for (const [command, num1, num2] of data.matchAll(pattern)) {
        if (command === "do()") {
            shouldProcess = true;
            continue;
        }

        if (command === "don't()") {
            shouldProcess = false;
            continue;
        }

        if (shouldProcess) {
            acc += parseInt(num1) * parseInt(num2);
        }
    }

    console.log(acc);
}

// solution1("test.txt");
// solution1("input.txt");

// solution2("test.txt");
solution2("input.txt");
