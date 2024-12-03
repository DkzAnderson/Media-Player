import { useState } from "react"
import { MediaList } from "./MediaList"
import { Header } from "./Header";
import { MediaPlayer } from "./MediaPlayer";


export const Main = () => {

    // Archivos de audio
    const [data,setData] = useState<File[]>([]);
    // Audio actual
    const [currentMusic,setCurrentMusic] = useState<number>(0);





    const styles = {
        main : 'w-full h-full bg-gradient-to-br from-black to-slate-950 text-white font-nunito',
        content : 'size-full grid grid-rows-[80px_auto_90px]',

    }

    return (
        <section className={styles.main}>
            <div className={styles.content}>
                {/* Header */}
                <header className='size-full'>
                    <Header
                        setData={setData}
                        setCurrentMusic={setCurrentMusic}
                        currentMusic={currentMusic}
                    />
                </header>
                {/* Lista de medios */}
                <div className="size-full">
                    <MediaList 
                        setCurrentMusic={setCurrentMusic}
                        data={data} 
                        currentMusic={currentMusic}
                    />
                </div>
                {/* Reproductor */}
                <div className="size-full">
                    <MediaPlayer 
                        data={data}
                        currentMusic={currentMusic}
                        setCurrentMusic={setCurrentMusic}
                    />
                </div>
            </div>
        </section>
    )
}
