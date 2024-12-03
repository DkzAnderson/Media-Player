import { TiArrowShuffle } from "react-icons/ti";
import { TiArrowRepeat } from "react-icons/ti";
import { BiSolidArrowToRight } from "react-icons/bi";
import { BiSolidArrowToLeft } from "react-icons/bi";
import { GoPlay } from "react-icons/go";
import { IoPauseCircle } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

interface Props {
  currentMusic: number;
  setCurrentMusic: Function;
  data: File[];
}

export const MediaPlayer: React.FC<Props> = ({currentMusic, setCurrentMusic, data}) => {

  const audioRef = useRef <HTMLAudioElement | null>(null);
  
  const [buttonIsDisabled,setDisabledButton] = useState <boolean>(true);
  const [isPlaying, setIsPlaying] = useState <boolean>(false);
  const [currentTime, setCurrentTime] = useState <number>(0);
  const [duration, setDuration] = useState <number>(0);
  // true = repetir 1 - null = repetir lista - false = no repetir;
  const [repeat,setRepeat] = useState <boolean | null> (false);
  const [random,setRandom] = useState <boolean>(false);
  const [audioSrc,setSrc] = useState <string>('');
  
  const styles = {
    main : 'size-full relative flex flex-col shadow-[0px_0px_24px_-4px] shadow-emerald-500',
    content : 'w-full h-full flex text-5xl text-blue-700 justify-evenly items-center',
    
    repeatBtn:{
      main: 'flex relative disabled:text-gray-700/50',
      number: `absolute -right-0 -top-1 text-base ${repeat ? 'flex' : 'hidden'}`,
      icon: `${repeat === null && 'text-orange-500'}`
    },
    randomBtn: `${random && 'text-orange-500'} disabled:text-gray-700/50`,
    othersBtns: 'active:text-orange-500 disabled:text-gray-700/50',

    duration:{
      main: 'absolute w-full flex justify-between px-5 -top-8',
      txt : 'text-lg font-300'
    },
    progressBar: {
      main: 'w-full flex absolute -top-0',
      span: '',
      input: 'w-full h-1'
    }
  }
  // Elegir el tipo de repeticion
  const SetRepeatFormat = ()=>{
    if(repeat === null) setRepeat(false);
    if(repeat) setRepeat(null);
    if(repeat === false) setRepeat(true);
  }
  // formatear tiempo mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };  
 // Manejar cuando el nuevo audio se carga completamente
  const handleLoadedData = () => {
    if (isPlaying) {
      audioRef.current?.play(); // Reproducir automáticamente cuando el audio esté listo
    }
  };
  // Play-Pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
      setIsPlaying(!isPlaying);
    }
  }
  // Tiempo actual del audio
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }
  // Buscar en el audio mediante la barra de progreso
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const seekTime = (e.target.valueAsNumber / 100) * audio.duration;
    audio.currentTime = seekTime;
  };

  // Establecer la duración del audio cuando cargue
  const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
  };
  // Avanzar al siguiente audio
  const NextMusic = ()=>{
    let i = GetRandomIndex(data.length);

    if(audioRef.current){
      if(random){
        if(i === currentMusic) i = GetRandomIndex(data.length);
        setCurrentMusic(i);
        setIsPlaying(true);
        GetURL(data[i]);
        audioRef.current.play();
        return
      } else {
      // Repetir Lista
      if(currentMusic >= (data.length - 1)){
        if(repeat === null){
          setCurrentMusic(0);
          GetURL(data[0])
          setIsPlaying(true);
          audioRef.current.play();
          return
        }
          //siguiente
      } else{
        
        if(currentMusic < (data.length - 1 )){
        setCurrentMusic(currentMusic + 1);
        setIsPlaying(true);
        GetURL(data[currentMusic])
        audioRef.current?.play();
        return
        }
      }
      }


    }

  }
  // regresar al audio anterior
  const PrevMusic = ()=>{
    let i = GetRandomIndex(data.length);

    if (audioRef.current){
      if(random){
        if(i === currentMusic) i = GetRandomIndex(data.length);
        setCurrentMusic(i);
        setIsPlaying(true);
        GetURL(data[i]);
        audioRef.current.play();
        return
        
      } else {
      // Si es el primer audio de la lista.
      if(currentMusic <= 0){
        if(repeat === null) setCurrentMusic(data.length-1);
        GetURL(data[data.length - 1])
        audioRef.current?.play();
        setIsPlaying(true);
        return

      } else {
        // audio anterior
        setCurrentMusic(currentMusic - 1);
        GetURL(data[currentMusic])
        setSrc(audioSrc);
        audioRef.current?.play();
        setIsPlaying(true);
      }
      }

    }

  }
  // Repetir Audio
  const RepeatMusic = ()=>{
    setCurrentMusic(currentMusic);
    setIsPlaying(true);
    GetURL(data[currentMusic])
    setSrc(audioSrc);
    audioRef.current?.play();
    return
  }
  // devuelve una ruta src valida para la etiqueta audio
  const GetURL = (val: File)=> {
    const url = URL.createObjectURL(val);
    setSrc(url);
  }

  const GetRandomIndex = (max: number): number =>{
    
    return Math.floor(Math.random() * (max - 0) + 0);
  
  }

  useEffect(()=>{
    if(data.length > 0) setDisabledButton(false)
      else setDisabledButton(true);
  
    if (audioRef.current && data.length > 0) {
      GetURL(data[currentMusic]);
      // Cambiar la fuente del audio
      audioRef.current.src = audioSrc; 
      // Asegurarse de que el nuevo audio se cargue
      audioRef.current.load(); 
      if (isPlaying) {
        audioRef.current.play()
      }
    }
},[data,currentMusic, isPlaying])

  return (
    <section className={styles.main}>
      {
        data.length > 0 &&

        <audio
        className="hidden"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onLoadedData={handleLoadedData}
        ref={audioRef}
        src={audioSrc}
        controls
        onEnded={()=>{
          if(repeat){
            console.log('holo')
            RepeatMusic()
          } else {
            NextMusic();
          }
        }}
      ></audio>
      
      }


      {/* Duración del audio */}
      <span className={styles.duration.main}>
        <h5 className={styles.duration.txt}>
          {formatTime(currentTime)}
        </h5>

        <h5 className={styles.duration.txt}>
          {formatTime(duration)}
        </h5>
      </span>

      { /* Barra de progreso */}
      <div className={styles.progressBar.main}>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className={styles.progressBar.input}
        />
      </div>

      {/* Controles */}
      <div className={styles.content}>

          {/* Aleatorio */}
          <button
            disabled={buttonIsDisabled}
            onClick={()=>setRandom(!random)}
            className={styles.randomBtn}
          >
            <TiArrowShuffle />
          </button>

          {/* Anterior */}
          <button
            className={styles.othersBtns}
            disabled={buttonIsDisabled}
            onClick={PrevMusic}
          >
          <BiSolidArrowToLeft />
          </button>

          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            disabled={buttonIsDisabled}
            className={styles.othersBtns}
          >
            {isPlaying ? <IoPauseCircle />:<GoPlay />}
          </button>

            {/* Siguiente */}
          <button
            className={styles.othersBtns}
            onClick={NextMusic}
            disabled={buttonIsDisabled}
          >
            <BiSolidArrowToRight />
          </button>

            {/* Repetir */}
          <button
            onClick={SetRepeatFormat}
            className={styles.repeatBtn.main}
            disabled={buttonIsDisabled}
          >
          <TiArrowRepeat className={styles.repeatBtn.icon}/>
          <h5
            className={styles.repeatBtn.number}
          >
            1
          </h5>
          </button>
      </div>
    </section>
  )
}
