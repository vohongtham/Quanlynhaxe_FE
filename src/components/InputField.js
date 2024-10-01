// import React from 'react';

// const InputField = ({ type, name, value, onChange, placeholder }) => {
//   return (
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       required
//     />
//   );
// };

// export default InputField;

import React, { forwardRef } from 'react';

const InputField = forwardRef(({
  type,
  name,
  value,
  onChange,
  placeholder,
  onBlur,
  error
}, ref) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        ref={ref}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
});

export default InputField;
