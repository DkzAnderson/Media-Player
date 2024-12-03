

export const Media = ({track}: any) => {

    const styles = {
        main : 'fixed w-full h-24 shadow-[0px_0px_12px_-4px] shadow-white bottom-0',
        content : 'size-full flex items-center justify-center',

    }

  return (
    <div className={styles.main}>
        <div className={styles.content}>
        <audio
              src={track}
              controls
            ></audio>
        </div>
    </div>
  )
}
