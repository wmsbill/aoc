function solution1(filename: string) {
    const data = Deno.readTextFileSync(filename).split("\n");
    const startPoints = [];
    const directions = [
        [-1, 0],
        [-1, 1],
        [-1, -1],
        [0, 1],
        [0, -1],
        [1, 0],
        [1, 1],
        [1, -1],
    ];

    for (const [lineNum, line] of data.entries()) {
        let lastIndex = 0;

        while (lastIndex !== -1) {
            lastIndex = line.indexOf("X", lastIndex);

            if (lastIndex !== -1) {
                startPoints.push([lineNum, lastIndex]);
                lastIndex++;
            }
        }
    }

    const entries = new Set<string>();
    for (const [x, y] of startPoints) {
        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;
            if (data[newX]?.charAt(newY) === "M") {
                entries.add(`${newX},${newY},${dx},${dy}`);
            }
        }
    }

    let count = 0;
    const word = ["A", "S"];

    for (const entry of entries) {
        const [x, y, dx, dy] = entry.split(",").map(Number);
        let i = 0;
        let newX = x + dx;
        let newY = y + dy;

        while (data[newX]?.charAt(newY) === word[i]) {
            i++;
            newX += dx;
            newY += dy;

            if (i === word.length) {
                count++;
                break;
            }
        }
    }

    console.info(count);
}

function has(data: string[], coord: [number, number][], letter: string) {
    return coord.every(([x, y]) => data[x]?.charAt(y) === letter);
}

function solution2(filename: string) {
    const data = Deno.readTextFileSync(filename).split("\n");
    const directions = {
        up: {
            coord: [
                [-1, -1],
                [-1, 1],
            ],
            next: "down",
        },
        left: {
            coord: [
                [-1, -1],
                [1, -1],
            ],
            next: "right",
        },
        down: {
            coord: [
                [1, -1],
                [1, 1],
            ],
            next: "up",
        },
        right: {
            coord: [
                [-1, 1],
                [1, 1],
            ],
            next: "left",
        },
    } as const;

    const entries = [];
    for (const [lineNum, line] of data.entries()) {
        let lastIndex = 0;

        while (lastIndex !== -1) {
            lastIndex = line.indexOf("A", lastIndex);

            if (lastIndex !== -1) {
                entries.push([lineNum, lastIndex]);
                lastIndex++;
            }
        }
    }

    const result = entries.filter(([x, y]) => {
        const keys = Object.keys(directions) as (keyof typeof directions)[];

        return keys.some((direction) => {
            const coord: [number, number][] = directions[direction].coord.map((
                [dx, dy],
            ) => [x + dx, y + dy]);
            const oppositeDirection = directions[direction].next;
            const oppositeCoord: [number, number][] =
                directions[oppositeDirection].coord.map((
                    [dx, dy],
                ) => [x + dx, y + dy]);

            return (has(data, coord, "M") &&
                has(data, oppositeCoord, "S"));
        });
    });

    console.log(result.length);
}

// solution1("test.txt");
// solution1("input.txt");

// solution2("test.txt");
solution2("input.txt");
