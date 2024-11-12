import styles from "./Header.module.css"
import mcLover from "../imgs/MCLOVER.png"

function Header({handleSubmit}){


    return(
        <div className={styles.headerContainer}>
            <div className={styles.title}>
                <img src={mcLover} alt="" />
                <h1>KCALovers</h1>  
            </div>
            <button className={styles.logout} onClick={handleSubmit}>Sair</button>
        </div>
    )
}

export default Header;