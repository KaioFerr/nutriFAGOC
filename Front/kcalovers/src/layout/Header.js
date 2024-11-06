import styles from "./Header.module.css"

function Header({handleSubmit}){


    return(
        <div className={styles.headerContainer}>
            <h1>KCALovers</h1>  
            <button className={styles.logout} onClick={handleSubmit}>Sair</button>
        </div>
    )
}

export default Header;