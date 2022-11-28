import React from "react";

const TextEditor = ({
  label,
  name,
  value,
  onChange,
  required,
  ...props
}) => {
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="mt-2">
      <div className="mb-1 font-medium">{label} {required ? "*" : "(OPTIONAL)"}</div>
      <div>
        <textarea
          id={name}
          name={name}
          className="block w-full bg-white py-2 pl-2 pr-3 border border-gray-300 rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:placeholder-gray-500 sm:text-sm"
          value={value}
          onChange={onChangeInput}
          {...props}
        />
      </div>
    </div>
  );
};
export default React.memo(TextEditor);
