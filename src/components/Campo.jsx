export const Campo = ({
  id,
  iconName,
  inputType,
  placeholder,
  onChange,
  value,
}) => {
  return (
    <>
      <div className="input-group mb-3">
        
        <span className="input-group-text">
          <i className={iconName}></i>
        </span>

        
        <input
          className="form-control"
          type={inputType}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          
          aria-label={placeholder}
        />
      </div>
    </>
  );
};
