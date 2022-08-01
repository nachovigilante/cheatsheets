import styles from "./Cheatsheet.module.scss";
import Link from "next/link";

export type CheatsheetType = {
    slug: string;
    frontmatter: {
        title: string;
        image: string;
    };
};

const Cheatsheet = ({ cheatsheet }: { cheatsheet: CheatsheetType }) => {
    return (
        <Link href={`/cheatsheet/${cheatsheet.slug}`}>
            <a className={styles["cheatsheet"]}>
                <img
                    src={cheatsheet.frontmatter.image}
                    alt={cheatsheet.frontmatter.title}
                />
                <h3>{cheatsheet.frontmatter.title}</h3>
            </a>
        </Link>
    );
};

export default Cheatsheet;
