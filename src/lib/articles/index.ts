import { getCollection } from 'astro:content';
import type { RawArticle } from '../../content.config';
import type { ArticleInfo } from './types';

export const getRawArticles = async (): Promise<RawArticle[]> => {
  const rawArticles = await getCollection('rawArticle');
  const sortedRawArticles = rawArticles.toSorted((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  return sortedRawArticles;
};

export const getArticleInfo = (article: RawArticle): ArticleInfo => ({
  id: article.id,
  title: article.data.title,
  tagList: article.data.tags,
  thumbnail: article.data.thumbnail?.src,
  publishedAt: article.data.publishedAt
});

export const getRelatedArticleInfoRecord = (
  targetRawArticle: RawArticle,
  rawArticles: RawArticle[]
): Record<string, ArticleInfo[]> => {
  const relatedArticles = rawArticles.filter(
    (rawArticle) =>
      rawArticle.id !== targetRawArticle.id &&
      rawArticle.data.tags.some((tag) => targetRawArticle.data.tags.includes(tag))
  );

  const relatedArticlesInfoRecord: Record<string, ArticleInfo[]> = {};
  targetRawArticle.data.tags.forEach((tag) => {
    const relatedArticleInfoList = relatedArticles
      .filter((relatedArticle) => relatedArticle.data.tags.includes(tag))
      .map(getArticleInfo);

    if (relatedArticleInfoList.length > 0) {
      relatedArticlesInfoRecord[tag] = relatedArticleInfoList;
    }
  });

  return relatedArticlesInfoRecord;
};
