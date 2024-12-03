function isSafe(report: number[]) {
    const isIncreasing = report[1] > report[0];

    for (const [index, item] of report.entries()) {
        if (index === 0) continue;
        const diff = item - report[index - 1];
        const absDiff = Math.abs(diff);

        if (
            (isIncreasing ? diff < 0 : diff > 0) || absDiff < 1 ||
            absDiff > 3
        ) {
            return false;
        }
    }

    return true;
}

function solution1(filename: string) {
    const data = Deno.readTextFileSync(filename);
    const reports = data.split("\n").map((x) =>
        x.split(" ").map((x) => Number(x))
    );

    let safeReports = 0;

    reports.forEach((report) => {
        safeReports += isSafe(report) ? 1 : 0;
    });

    console.log(safeReports);
}

function solution2(filename: string) {
    const data = Deno.readTextFileSync(filename);
    const reports = data.split("\n").map((x) =>
        x.split(" ").map((x) => Number(x))
    );

    let safeReports = 0;

    for (const report of reports) {
        if (isSafe(report)) {
            safeReports++;
        } else {
            report.some((_, index, arr) => isSafe(arr.toSpliced(index, 1)))
                ? safeReports++
                : null;
        }
    }

    console.log(safeReports);
}

// solution1("test.txt");
// solution1("input.txt");

// solution2("test.txt");
solution2("input.txt");
