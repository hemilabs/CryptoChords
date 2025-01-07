import ReactSelect from 'react-select';

export const Select = function (props: {
  value: string;
  onChange: (value?: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <ReactSelect
      className={`${props.className ?? ''}`}
      defaultValue={props.options.find(option => option.value === props.value)}
      onChange={option => props.onChange(option?.value)}
      options={props.options}
      isMulti={false}
      styles={{
        control: (provided, state) => ({
          ...provided,
          backgroundColor: 'white',
          border: 'none',
          borderBottomLeftRadius: state.menuIsOpen ? '0' : '0.7rem',
          borderBottomRightRadius: state.menuIsOpen ? '0' : '0.7rem',
          borderRadius: '0.7rem',
          transitionDuration: '0s',
        }),
        dropdownIndicator: (provided, state) => ({
          ...provided,
          rotate: state.selectProps.menuIsOpen ? '180deg' : '0',
        }),
        menu: provided => ({
          ...provided,
          backgroundColor: 'white',
          borderRadius: '0.7rem',
          borderTop: 'none',
          borderTopLeftRadius: '0',
          borderTopRightRadius: '0',
          marginTop: '0',
        }),
        menuList: provided => ({
          ...provided,
          borderRadius: '0.7rem',
          borderTopLeftRadius: '0',
          borderTopRightRadius: '0',
        }),
        option: (provided, state) => ({
          ...provided,
          '&:hover': {
            backgroundColor: '#666',
            color: 'white',
          },
          'backgroundColor': state.isSelected ? '#ccc' : 'white',
          'color': 'black',
        }),
      }}
    />
  );
};
