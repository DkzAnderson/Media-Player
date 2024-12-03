import { useEffect, useState } from 'react'

export const Media = () => {

  const [currentMusic,setMusic] = useState<string | null>("");

  const GetData = (e : React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0];
  
    if(file){
      const audioURL = URL.createObjectURL(file);
      setMusic(audioURL);
      console.log("Archivo seleccionado:", file.name);
    }
  }

  useEffect(()=>{

  },[])

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='bg-emerald-400 w-full'>
      <input 
        type='file'
        onChange={(e)=>GetData(e)}
        name='file'
        multiple
        accept='audio/*' // Solo permite archivos de audio
      >
      </input>
      {currentMusic && (
        <audio
          src={currentMusic}
          controls
          className='mt-4'
        ></audio>
      )}
      </div>
    </div>
  )
}
