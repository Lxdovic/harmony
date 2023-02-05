const Input = ({ type, value, placeholder, onChange, className }) => {
  return (
    <input
      className={`bg-zinc-800 text-white placeholder-zinc-500 rounded p-2 mb-2 w-96 outline-none ${className}`}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
