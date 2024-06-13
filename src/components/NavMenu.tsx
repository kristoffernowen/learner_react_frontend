import styles from "./NavMenu.module.css"
import {Link} from "react-router-dom";

export default function NavMenu() {
    return <div className={styles.navDiv}>
        <div>
            <Link to={"/"}><button>Hem</button></Link>
            <Link to={"/choose-exercise"}><button>Välj övning att träna</button></Link>
            <Link to={"/manage-exercises"}><button>Hantera övningar</button></Link>
            <Link to={"/new-exercise"}><button>Skapa övning</button></Link>
        </div>
    </div>
}
