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
    (comparisonTarget) =>
      comparisonTarget.id !== targetRawArticle.id &&
      comparisonTarget.data.tags.some((tag) => targetRawArticle.data.tags.includes(tag))
  );

  const relatedArticlesRecord: Record<string, ArticleInfo[]> = {};
  relatedArticles.forEach((relatedArticle) => {
    relatedArticle.data.tags.forEach((tag) => {
      if (!relatedArticlesRecord[tag]) relatedArticlesRecord[tag] = [];

      relatedArticlesRecord[tag].push({
        id: relatedArticle.id,
        title: relatedArticle.data.title,
        thumbnail: relatedArticle.data.thumbnail?.src,
        publishedAt: relatedArticle.data.publishedAt,
        tagList: relatedArticle.data.tags
      });
    });
  });

  return relatedArticlesRecord;
};
