import styles from "./NavMenu.module.css"
import {Link} from "react-router-dom";

export default function NavMenu() {
    return <div className={styles.navDiv}>
        <div>
            <Link to={"/"}><button>Hem</button></Link>
            <Link to={"/manage-exercises"}><button>Hantera övningar</button></Link>
        </div>
    </div>
}
