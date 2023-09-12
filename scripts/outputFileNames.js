import { readdir } from "fs/promises";
import { join } from "path";

const dir = "output-files";

const outputFileNames = async () => {
    const currentDir = process.cwd();
    const dirWithFiles = join(currentDir, dir);

    const dirents = await readdir(dirWithFiles, { withFileTypes: true });
    const files = dirents.reduce((acc, dirent) => {
        if (dirent.isFile() && !dirent.name.startsWith("."))
            acc.push(dirent.name);
        return acc;
    }, []);

    console.log(files);
};

outputFileNames();
