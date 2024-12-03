import React from 'react'


// Indica el tipo de valor que se recibe como parametro
interface Props {
    data: File[];
    setCurrentMusic: Function;
    currentMusic: number;
}
                // Agregamos el tipo de valor a recibir
export const MediaList: React.FC<Props> = ({data, setCurrentMusic,currentMusic}) => {

    const styles = {
        main : 'flex size-full font-nunito',
        content: `size-full flex ${data.length > 0 ? 'items-start' : 'items-center'} justify-center`,
        
        list : 'w-full max-w-screen py-3 h-full max-h-[78vh] flex flex-col gap-2 overflow-y-auto overflow-x-hidden',
        itemList: 'flex text-zinc-400 p-3 w-screen overlfow-hidden',
        text: `text-start w-full w-full text-xl truncate `,
        audioSelected: 'w-full max-w-full font-bold text-emerald-300 whitespace-nowrap',
        noDataTxt: 'text-4xl text-center',

    }


    const SetMusic = (index: number)=>{
        setCurrentMusic(index)
    }

  return (
    <section className={styles.main}>
        <div className={styles.content}>
            
          {data.length > 0 ?
              <ul className={styles.list}>
                {data.map((value: File,i)=>(
                    <li
                        key={i}
                        className={styles.itemList}
                        onClick={()=>SetMusic(i)}
                    >
                        <button className={`${styles.text} ${currentMusic === i && styles.audioSelected}`}>
                            {value.name}
                        </button>
                    </li>
                ))}
              </ul> 
              
              :

              <label className={styles.noDataTxt}>
                  No hay archivos en la lista
                  de reproducción.
              </label>
          }

        </div>
    </section>
  )
}
