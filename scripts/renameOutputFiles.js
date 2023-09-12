import { readdir, rename } from "fs/promises";
import { join } from "path";

const outputDir = "output-files";

const renameOutputFiles = async () => {
    const currentDir = process.cwd();
    const dirWithFiles = join(currentDir, outputDir);

    const dirents = await readdir(dirWithFiles, { withFileTypes: true });
    const files = dirents.reduce((acc, dirent) => {
        if (dirent.isFile() && !dirent.name.startsWith(".")) {
            const oldName = dirent.name;
            // to lowercase & replace spaces with dashes
            const newName = oldName.toLowerCase().replace(/\s+/g, "-");
            const oldPath = join(dirWithFiles, oldName);
            const newPath = join(dirWithFiles, newName);

            acc.push({
                oldName,
                newName,
                oldPath,
                newPath,
            });
        }
        return acc;
    }, []);

    for (const file of files) {
        const { oldPath, newPath } = file;
        await rename(oldPath, newPath);
    }
};

renameOutputFiles();
