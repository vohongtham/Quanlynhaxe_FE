import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const top100Films = [
  { label: 'Khoa Công nghệ thông tin', id: 1 },
  { label: 'Khoa Kinh tế', id: 2 },
  { label: 'Khoa Ngoại ngữ', id: 3 },
  { label: 'Khoa Luật', id: 4 },
  { label: 'Khoa Y học', id: 5 },
  // Bạn có thể thêm các lựa chọn khác vào đây
];

export default function ComboBox({ name, value, onChange }) {
  return (
    <Autocomplete
      disablePortal
      options={top100Films}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Khoa" />}
      onChange={(event, newValue) => {
        onChange({ target: { name, value: newValue ? newValue.label : '' } });
      }}
    />
  );
}
