import Heading from "./Heading"

export default function Logo(props) {
  const { className } = props
  return (
    <div className={`w-[100px] flex flex-col items-center ` + className}>
      <img className="mb-1" src="icon.png" alt="Elipæren Logo" />
      <Heading h1>
        El<span className="text-primary">i</span>pæren
      </Heading>
    </div>
  )
}
