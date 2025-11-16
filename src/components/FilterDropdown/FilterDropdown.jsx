import css from "./FilterDropdown.module.css";
import { useState } from "react";
import { FilterDown, FilterUp } from "../../icons";

const FilterDropdown = ({ options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css.filterDropdown}>
      <p className={css.filterDropdownLabel}>Filters</p>
      <button
        className={css.filterDropdownButton}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find((option) => option.value === selected)?.label}
        {isOpen ? <FilterUp /> : <FilterDown />}
      </button>
      {isOpen && (
        <ul className={css.filterDropdownList}>
          {options.map((option) => (
            <li
              key={option.value}
              className={
                selected === option.value
                  ? `${css.filterDropdownItem} ${css.active}`
                  : css.filterDropdownItem
              }
              onClick={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;
