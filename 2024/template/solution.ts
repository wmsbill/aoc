function solution1(filename: string) {
    const data = Deno.readTextFileSync(filename);

    console.log(data);
}

function solution2(filename: string) {
    const data = Deno.readTextFileSync(filename);

    console.log(data);
}

solution1("test.txt");
// solution1("input.txt");

// solution2("test.txt");
// solution2("input.txt");
