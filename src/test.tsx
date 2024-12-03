import React, { useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { RiFileAddFill } from "react-icons/ri";
import { addAudioFiles, getAudioFiles } from './DataBase'; // Importa las funciones de IndexedDB

interface Props {
    setData: Function;
    setCurrentMusic: Function;
    currentMusic: number;
}

export const Header: React.FC<Props> = ({ setData, setCurrentMusic, currentMusic }) => {
    const [playListLoaded, setLoadedState] = useState<boolean>(false);
    const [audioList, setAudioList] = useState<File[]>([]);

    const styles = {
        main: 'size-full max-w-[100vw] shadow-[0px_0px_24px_-4px] shadow-emerald-500 overflow-hidden',
        content: 'size-full flex justify-evenly items-center p-2 gap-2 duration-300',
        rightBox: 'size-auto flex gap-4',
        titleBox: {
            main: 'w-full max-w-52 duration-300 overflow-hidden',
            text: 'w-full h-full whitespace-nowrap animate-marquee text-emerald-500 text-xl font-bold'
        },
        addFiles: {
            main: '',
            icon: 'text-3xl cursor-pointer'
        },
        search: {
            main: ` relative ${playListLoaded ? 'hidden' : 'hidden'} w-auto gap-3`,
            icon: 'absolute right-0 bottom-1 text-3xl z-0',
            input: 'bg-transparent w-8 group z-10 focus:pl-2 focus:pr-8 focus:w-48 border-b border-transparent text-transparent focus:text-white focus:border-white  duration-300 outline-none'
        }
    };

    // Función para manejar la carga de archivos
    const GetData = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files: File[] = Array.from(e.target.files || []); // Convierte FileList en un array
        setData(files);
        setAudioList(files);
        setCurrentMusic(0);
        setLoadedState(true);

        // Guarda los archivos en IndexedDB
        await addAudioFiles(files);
    };

    // Cargar archivos desde IndexedDB al iniciar
    useEffect(() => {
        const fetchAudioFiles = async () => {
            const storedFiles = await getAudioFiles();
            const files = storedFiles.map((entry: any) => entry.file); // Recupera solo los archivos
            setData(files);
            setAudioList(files);
        };

        fetchAudioFiles();
    }, []);

    return (
        <section className={styles.main}>
            <div className={styles.content}>
                <span>LOGO</span>

                <div className={styles.rightBox}>
                    <div className={styles.titleBox.main}>
                        <h2 className={styles.titleBox.text}>
                            {audioList.length > 0 && audioList[currentMusic]?.name}
                        </h2>
                    </div>

                    <span className={styles.search.main}>
                        <IoIosSearch className={styles.search.icon} />
                        <input
                            type='text'
                            className={styles.search.input}
                        />
                    </span>

                    <label htmlFor="input" className={styles.addFiles.main}>
                        <RiFileAddFill className={styles.addFiles.icon} />
                        <input
                            className="hidden"
                            id="input"
                            type="file"
                            onChange={GetData}
                            multiple
                            accept="audio/*"
                        />
                    </label>
                </div>
            </div>
        </section>
    );
};
