// import React from 'react';
// // import './styles.css'; // Ensure you import the CSS file

// const SearchInput = ({ value = '', onSubmit, onChange }) => {
//   const handleChange = (e) => {
//     if (onChange) {
//       onChange(e.target.value);
//     }
//   };

//   const handleKeyUp = (e) => {
//     if (e.key === 'Enter' && onSubmit) {
//       onSubmit();
//     }
//   };

//   return (
//     <div className="input-group mt-4" >
//       <input
//         type="text"
//         className="form-control me-2"
//         placeholder="Nhập thông tin cần tìm"
//         value={value}
//         onChange={handleChange}
//         onKeyUp={handleKeyUp}
//         style={{ borderRadius: '10px', margin: '10px'}}
//       />
//       <div className="mb-3">
//                 <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Tìm kiếm nhân viên..."
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                 />
//             </div>
//       <div className="input-group-append">
//         <button 
//           className="btn btn-outline-secondary" 
//           type="button" 
//           onClick={onSubmit}
//           style={{ margin: '10px' }}
//         >
//           <i className="fas fa-search"></i> Tìm kiếm
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SearchInput;



import React from 'react';

const InputSearch = ({ value, onChange, onSubmit }) => {
    const handleInputChange = (event) => {
        onChange(event.target.value); // Pass the input value to the parent
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSubmit(); // Trigger the search when Enter is pressed
        }
    };

    return (
        <div className="input-group">
            <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm nhân viên..."
                value={value} // Make sure this refers to the searchTerm passed from parent
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <div className="input-group-append">
                <button className="btn btn-primary" onClick={onSubmit}>
                    Tìm kiếm
                </button>
            </div>
        </div>
    );
};

export default InputSearch;
