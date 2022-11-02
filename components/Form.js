import styles from '../styles/Home.module.css'

const Form = ({handleChange, form, handleSubmit}) => {
    return (  
        <form onSubmit={(e)=>e.preventDefault} autoComplete="off" className={styles.form}>
            <input type="text" name="nickname" placeholder="Nickname" onChange={handleChange} value={form.nickname} className={`${styles.form_el} ${styles.text}`} required/>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} value={form.password} className={`${styles.form_el} ${styles.text}`} required/>
            <input className={`${ (!form.nickname|| form.password.length<8 || form.password.length>50 || form.nickname.length>20) ? styles.disabled : styles.button} ${styles.form_el} `}  type="button" value="Sign Up" onClick={handleSubmit}/>
            <input className={`${ (!form.nickname|| form.password.length<8 || form.password.length>50 || form.nickname.length>20) ? styles.disabled : styles.button} ${styles.form_el}`} type="button" value="Sign In" onClick={handleSubmit}/>
        </form>
    );
}
 
export default Form;