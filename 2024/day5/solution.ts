function readData(filename: string) {
    const data = Deno.readTextFileSync(filename).split("\n\n");
    const map = new Map<number, Set<number>>();

    data[0].split("\n").forEach((line) => {
        const [key, value] = line.split("|").map(Number);

        if (!map.has(key)) {
            map.set(key, new Set());
        }

        map.get(key)?.add(value);
    });

    const pages = data[1].split("\n").map((x) => x.split(",").map(Number));
    return { pages, map };
}

function isCorrect(entry: number[], map: Map<number, Set<number>>) {
    for (let i = entry.length - 1; i > 0; i--) {
        const before = map.get(entry[i]);

        for (let j = 0; j < i; j++) {
            if (before?.has(entry[j])) {
                return false;
            }
        }
    }

    return true;
}

function solution1(filename: string) {
    const { pages, map } = readData(filename);
    let acc = 0;

    for (const entry of pages) {
        if (isCorrect(entry, map)) {
            const mid = Math.floor(entry.length / 2);
            acc += entry[mid];
        }
    }

    console.log(acc);
}

function solution2(filename: string) {
    const { pages, map } = readData(filename);
    const incorrect = pages.filter((entry) => !isCorrect(entry, map))
        .map((entry) =>
            entry.sort((a, b) => {
                const before = map.get(a);
                const after = map.get(b);

                if (before?.has(b)) {
                    return 1;
                }

                if (after?.has(a)) {
                    return -1;
                }

                return 0;
            })
        );

    const result = incorrect.reduce((acc, entry) => {
        const mid = Math.floor(entry.length / 2);
        return acc + entry[mid];
    }, 0);

    console.info(result);
}

// solution1("test.txt");
// solution1("input.txt");

// solution2("test.txt");
solution2("input.txt");
