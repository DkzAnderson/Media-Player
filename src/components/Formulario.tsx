import React, { useState } from 'react'




export const Formulario = () => {

    const [userName,setUserName] = useState('');
    const [userPassword,setUserPassword] = useState('');

    const GetName = (e)=>{
        setUserName(e.target.value);
    }

    const GetPassword = (e) =>{
        setUserPassword(e.target.value);
    }


    const styles = {
        main : 'font-nunito',
        content: 'flex flex-col gap-16',
        form : 'relative group',
        input: 'bg-transparent text-2xl border-b text-white outline-none py-2',

        nameL : `absolute ${userName.length <= 0 ? 'left-2 top-2' : 'left-2 -top-8 text-green-500 '} font-bold text-2xl text-white duration-300`,
        passwordL: `absolute ${userPassword.length <= 0 ? 'left-2 top-2' : 'left-2 -top-8 text-green-500 '} font-bold text-2xl text-white duration-300`
    }


  return (
      <section className={styles.main}>
          <div className={styles.content}>
              <form className={styles.form}>
                <label className={styles.nameL}> 
                    Usuario
                </label>
                <input 
                    className={styles.input}
                    type="text" 
                    name="name"
                    onChange={(e)=>GetName(e)}
                />
              </form>

              <form className={styles.form}>
                <label className={styles.passwordL}> 
                    Contraseña
                </label>
                <input 
                    className={styles.input}
                    type="password" 
                    name="password" 
                    onChange={(e)=>GetPassword(e)}
                />
              </form>
          </div>
      </section>
  )
}
