import Link from "next/link";
import { PostData } from "@/lib/utils";
import styles from "@/styles/components/box/_ArticleHead.module.scss";

type Props = {
  postData: PostData;
};

const ArticleHead: React.VFC<Props> = (props) => {
  const date = (() => {
    if (props.postData.date.str === props.postData.update.str) {
      return (
        <div className={styles["cmp_article-head_date"]}>
          <p>公開日：</p>
          <p>{props.postData.date.str}</p>
        </div>
      );
    } else {
      return (
        <>
          <div className={styles["cmp_article-head_date"]}>
            <p>公開日：</p>
            <p>{props.postData.date.str}</p>
          </div>
          <div className={styles["cmp_article-head_date"]}>
            <p>更新日：</p>
            <p>{props.postData.update.str}</p>
          </div>
        </>
      );
    }
  })();

  return (
    <div className={styles["cmp_article-head"]}>
      {date}
      <h1 className={styles["cmp_article-head_hdg"]}>{props.postData.title}</h1>
      <div className={styles["cmp_article-head_tag-list"]}>
        <ul className={styles["cmp_article-head_tag-list-inr"]}>
          {props.postData.tags.map((tag) => (
            <li key={tag} className={styles["cmp_article-head_tag-list-item"]}>
              <Link href="/blog/tags/[name]" as={`/blog/tags/${tag}`}>
                <a>{tag}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticleHead;
