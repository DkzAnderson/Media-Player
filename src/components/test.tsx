
const element = <h1 className="text-4xl font-nunito text-red-600"> Domo </h1>



const x = (name: string, lastName: string) =>{
    return <h2>
        {`Hello, My name is ${name} ${lastName}`}
    </h2>
}

export const Test = () => {
  return (
    <div>
        {x('Anderson','Ollarves')}
    </div>
  )
}
