import ReactDOM from "react-dom"
import styles from '../styles/Home.module.css'

const LogoutButton = ({setValidation,setShowPosts,initialValidation}) => {
    return ReactDOM.createPortal( 
        <button onClick={()=>{
            setValidation(initialValidation)
            setShowPosts(false)
        }} className={styles.button}>Logout</button>,
        document.getElementById("header")
    );
}
 
export default LogoutButton;