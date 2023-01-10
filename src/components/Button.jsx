export default function Button(props) {
  const { className, text, onClick } = props
  return (
    <button className={`px-3 rounded-2xl py-3 lg:py-5 ` + className} onClick={onClick}>
      {text}
    </button>
  )
}
