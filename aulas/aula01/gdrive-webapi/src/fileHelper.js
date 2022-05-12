import fs from "fs";
import prettyBytes from "pretty-bytes";
export default class FileHelper {
  static async getFilesStatus(downloadsFolder) {
    const currentFiles = await fs.promises.readdir(downloadsFolder);

    const statuses = await Promise.all(
      currentFiles.map((filename) =>
        fs.promises.stat(`${downloadsFolder}/${filename}`)
      )
    );

    const fileStatuses = [];

    for (const fileIndex in currentFiles) {
      const { birthtime, size } = statuses[fileIndex];
      console.log({ birthtime, size: prettyBytes(size) });
      fileStatuses.push({
        size: prettyBytes(size),
        file: currentFiles[fileIndex],
        lastModified: birthtime,
        owner: process.env.USER,
      });
    }
    return fileStatuses;
  }
}
