export default function InputField({ state, setState, placeholder }) {
  return (
    <input
      className="bg-lighter border-solid outline-none border-2 border-lighter w-full rounded-2xl py-3 px-6 text-text leading-tight focus:border-primary placeholder:opacity-50 placeholder:text-white"
      type="text"
      value={state}
      onChange={(e) => setState(e.target.value)}
      placeholder={placeholder}
    />
  )
}
