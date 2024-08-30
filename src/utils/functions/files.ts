import { readdir, stat } from "fs/promises";
import { join } from "path";

/**
 * Read the contents of a directory recursively
 * @param directory The directory to read
 * @param filter An optional filter function to determine which files to include
 * @returns A promise that resolves to an array of file paths
 */
export async function readDirectoryRecursively(
	directory: string,
	filter?: (file: string) => boolean,
): Promise<string[]> {
	let files: string[] = [];

	try {
		// Read the contents of the directory
		const items = await readdir(directory);

		for (const item of items) {
			const fullPath = join(directory, item);
			const stats = await stat(fullPath);

			if (!filter || filter(item)) {
				if (stats.isDirectory()) {
					// If it's a directory, recursively read its contents
					const subDirectoryFiles = await readDirectoryRecursively(fullPath);
					files = files.concat(subDirectoryFiles);
				} else {
					// If it's a file, add it to the list
					files.push(fullPath);
				}
			}
		}
	} catch (error) {
		throw error;
	}

	return files;
}
