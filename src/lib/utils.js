import glob from 'glob';
import gm from 'gray-matter';
import fs from 'fs';
import path from 'path';

/**
 * 記事データ取得
 * @param {string} [exploreFileName] 取得したい記事のファイル名
 * @returns {array}
 */
export const getPostDataArr = (exploreFileName = '*') => {
    const rootPath = path.resolve(process.cwd(), './src/');
    const filePaths = glob.sync(`/post/**/${exploreFileName}.md`, {
        root: rootPath,
        nomount: true,
    });
    const postDataArr = filePaths.map((filePath) => {
        const file = fs.readFileSync(rootPath + filePath, 'utf-8');
        const fileData = gm(file);
        const title = fileData.data.title;
        const date = (() => {
            const year = String(fileData.data.date.getFullYear());
            const month = String(fileData.data.date.getMonth() + 1).padStart(2, '0');;
            const date = String(fileData.data.date.getDate()).padStart(2, '0');
            const hour = String(fileData.data.date.getHours()).padStart(2, '0');
            const minutes = String(fileData.data.date.getMinutes()).padStart(2, '0');

            return {
                year,
                month,
                date,
                hour,
                minutes,
                str: `${year}/${month}/${date} - ${hour}:${minutes}`,
            };
        })();
        const tags = fileData.data.tags;
        const thumbnail = fileData.data.thumbnail;
        const body = fileData.content;
        const filePathWithoutExt = filePath.replace(/\.md$/, '');
        const fileName = (() => {
            const pathArr = filePathWithoutExt.split('/');
            return pathArr[pathArr.length - 1];
        })();

        return {
            title,
            date,
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
        const dateA = parseInt(`${postDataA.date.year}${postDataA.date.month}${postDataA.date.date}${postDataA.date.hour}${postDataA.date.minutes}`, 10);
        const dateB = parseInt(`${postDataB.date.year}${postDataB.date.month}${postDataB.date.date}${postDataB.date.hour}${postDataB.date.minutes}`, 10);

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
export const splitPostDataArr = (postDataArr, splitIndex = 10) => {
    const splittedPostDataArr = postDataArr.reduce((accumulator, currentData, i) => {
        if (i % splitIndex === 0) {
            accumulator.push([]);
        }

        const lastIndex = accumulator.length - 1;
        accumulator[lastIndex].push(currentData);

        return accumulator;
    }, []);

    return splittedPostDataArr;
};