export default function InputField({ state, setState, placeholderValue }) {
  return <input className="bg-lighter" type="text" onChange={(e) => setState(e.target.value)} placeholder={placeholderValue} />
}
