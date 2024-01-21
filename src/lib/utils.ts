import glob from "glob";
import gm from "gray-matter";
import fs from "fs";
import path from "path";

export type DateInfo = {
  year: string;
  month: string;
  date: string;
  hour: string;
  minutes: string;
  seconds: string;
  str: string;
};
export type PostData = {
  title: string;
  date: DateInfo;
  update: DateInfo;
  tags: string[];
  thumbnail: string;
  body: string;
  filePath: string;
  filePathWithoutExt: string;
  fileName: string;
};
/**
 * 記事データ取得
 * @param {string} [exploreFileName] 取得したい記事のファイル名
 * @returns {array}
 */
export const getPostDataArr = (exploreFileName = "*"): PostData[] => {
  const rootPath = path.resolve(process.cwd(), "./src/");
  const filePaths = glob.sync(`/blog/post/**/${exploreFileName}.md`, {
    root: rootPath,
    nomount: true,
  });
  const postDataArr = filePaths.map((filePath) => {
    const file = fs.readFileSync(rootPath + filePath, "utf-8");
    const fileData = gm(file);
    const title = fileData.data.title;
    const getDateInfo = (dateObj: Date): DateInfo => {
      const year = String(dateObj.getFullYear());
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const date = String(dateObj.getDate()).padStart(2, "0");
      const hour = String(dateObj.getHours()).padStart(2, "0");
      const minutes = String(dateObj.getMinutes()).padStart(2, "0");
      const seconds = String(dateObj.getSeconds()).padStart(2, "0");

      return {
        year,
        month,
        date,
        hour,
        minutes,
        seconds,
        str: `${year}/${month}/${date} - ${hour}:${minutes}`,
      };
    };
    const date = getDateInfo(fileData.data.date);
    const update = getDateInfo(fileData.data.update);
    const tags = fileData.data.tags;
    const thumbnail = fileData.data.thumbnail;
    const body = fileData.content;
    const filePathWithoutExt = filePath.replace(/\.md$/, "");
    const fileName = (() => {
      const pathArr = filePathWithoutExt.split("/");
      return pathArr[pathArr.length - 1];
    })();

    return {
      title,
      date,
      update,
      tags,
      thumbnail,
      body,
      filePath,
      filePathWithoutExt,
      fileName,
    };
  });

  // 降順にソート
  postDataArr.sort((postDataA, postDataB) => {
    const dateA = parseInt(
      `${postDataA.date.year}${postDataA.date.month}${postDataA.date.date}${postDataA.date.hour}${postDataA.date.minutes}`,
      10
    );
    const dateB = parseInt(
      `${postDataB.date.year}${postDataB.date.month}${postDataB.date.date}${postDataB.date.hour}${postDataB.date.minutes}`,
      10
    );

    return dateB - dateA;
  });

  return postDataArr;
};
/**
 * 記事データを任意の数ずつ分割する
 * @param {array} postDataArr 記事データの配列
 * @param {number} [splitIndex] データを分割するタイミング
 * @returns {array}
 */
export const splitPostDataArr = (
  postDataArr: PostData[],
  splitIndex: number = 10
): PostData[][] => {
  const splitPostDataArr = postDataArr.reduce(
    (accumulator: PostData[][], currentData: PostData, i) => {
      const toPushIndex = Math.trunc(i / splitIndex);
      accumulator[toPushIndex].push(currentData);

      return accumulator;
    },
    new Array(Math.ceil(postDataArr.length / splitIndex))
      .fill(null)
      .map((_) => [])
  );

  return splitPostDataArr;
};
