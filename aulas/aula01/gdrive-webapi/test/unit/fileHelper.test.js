import { describe, test, expect, jest } from "@jest/globals";
import fs from "fs";
import FileHelper from "../../src/fileHelper.js";
import Routes from "../../src/routes.js";
describe("#FileHelper", () => {
  describe("#getFileStatus", () => {
    test("it should return files statuses in correct format", async () => {
      const statMock = {
        dev: 64769,
        mode: 33204,
        nlink: 1,
        uid: 1001,
        gid: 1001,
        rdev: 0,
        blksize: 4096,
        ino: 15206806,
        size: 978992,
        blocks: 1920,
        atimeMs: 1651572611382.862,
        mtimeMs: 1651572611252,
        ctimeMs: 1651572611250.855,
        birthtimeMs: 1651572599666.2188,
        atime: "2022-05-03T10:10:11.383Z",
        mtime: "2022-05-03T10:10:11.252Z",
        ctime: "2022-05-03T10:10:11.251Z",
        birthtime: "2022-05-03T10:09:59.666Z",
      };
      const mockUser = "Tiago santos";
      process.env.USER = mockUser;
      const filename = "file.png";
      const mockdir = [filename];
      jest
        .spyOn(fs.promises, fs.promises.readdir.name)
        .mockResolvedValue(mockdir);
      jest
        .spyOn(fs.promises, fs.promises.stat.name)
        .mockResolvedValue(statMock);

      const result = await FileHelper.getFilesStatus("/tmp");

      const expectedResult = [
        {
          size: "979 kB",
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename,
        },
      ];

      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`);
      expect(result).toMatchObject(expectedResult);
    });
  });
});
