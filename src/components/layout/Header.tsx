import Link from "next/link";
import styles from "@/styles/components/layout/_Header.module.scss";

type Props = {
  hasTitle: boolean;
};

const Header: React.VFC<Props> = (props) => {
  const h1Title = "したがきちょう";
  const navListItem = [
    {
      href: "https://twitter.com/sitagakey",
      name: "Twitter",
    },
    {
      href: "https://github.com/sitagakey",
      name: "GitHub",
    },
  ];

  return (
    <header className={styles["cmp_header"]}>
      <div className={styles["cmp_header_inr"]}>
        {props.hasTitle ? (
          <p className={styles["cmp_header_hdg"]}>
            <Link href="/blog">
              <a>{h1Title}</a>
            </Link>
          </p>
        ) : (
          <h1 className={styles["cmp_header_hdg"]}>
            <Link href="/blog">
              <a>{h1Title}</a>
            </Link>
          </h1>
        )}
        <nav className={styles["cmp_header_nav"]}>
          <ul className={styles["cmp_header_nav-list"]}>
            {navListItem.map(({ href, name }) => (
              <li key={href} className={styles["cmp_header_nav-list-item"]}>
                <Link href={href}>
                  <a>{name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
