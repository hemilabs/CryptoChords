import ReactSelect from 'react-select'

export const Select = function (props: {
  value: string
  onChange: (value?: string) => void
  options: { value: string, label: string }[]
  className?: string
}) {
  return (
    <ReactSelect
      className={`${props.className ?? ''}`}
      defaultValue={props.options.find(option => option.value === props.value)}
      onChange={(option) => props.onChange(option?.value)}
      options={props.options}
      isMulti={false}
      styles={{
        control: (provided, state) => ({
          ...provided,
          borderRadius: '0.7rem',
          backgroundColor: 'white',
          borderBottomLeftRadius: state.menuIsOpen ? '0' : '0.7rem',
          borderBottomRightRadius: state.menuIsOpen ? '0' : '0.7rem',
          border: 'none',
          transitionDuration: '0s',
        }),
        dropdownIndicator: (provided, state) => ({
          ...provided,
          rotate: state.selectProps.menuIsOpen ? '180deg' : '0',
        }),
        menu: (provided) => ({
          ...provided,
          backgroundColor: 'white',
          borderTop: 'none',
          borderRadius: '0.7rem',
          borderTopLeftRadius: '0',
          borderTopRightRadius: '0',
          marginTop: '0',
        }),
        menuList: (provided) => ({
          ...provided,
          borderRadius: '0.7rem',
          borderTopLeftRadius: '0',
          borderTopRightRadius: '0',
        }),
        option: (provided, state) => ({
          ...provided,
          color: 'black',
          backgroundColor: state.isSelected ? '#ccc' : 'white',
          '&:hover': {
            backgroundColor: '#666',
            color: 'white'
          }
        }),
      }}
    />
  )
}
