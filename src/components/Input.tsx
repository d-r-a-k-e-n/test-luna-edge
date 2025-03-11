import { CustomInputProps } from "../types";

const Input = ({ label, name, register, error }: CustomInputProps) => {
  return (
    <label className="flex flex-col gap-2 my-4">
      {label}:
      <input
        className={`peer py-3 px-4 w-[400px] h-10 border rounded-lg outline-none transition-all
        hover:border-violet-600 focus:border-violet-600 focus:ring-1 focus:ring-violet-600
        ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
      `}
        {...register(name, {
          required: "This field is required.",
          pattern: {
            value: /^[A-Za-z]{2,12}$/,
            message: "Enter 2 to 12 Latin letters",
          },
        })}
        type="text"
        placeholder={label}
      />
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </label>
  );
};
export default Input;
