import css from "./FilterDropdown.module.css";
import { useState } from "react";
import { FilterDown, FilterUp } from "../../icons";

const FilterDropdown = ({ options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === selected);

  const handleOptionSelect = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  const handleOptionKeyDown = (e, value) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOptionSelect(value);
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <div className={css.filterDropdown}>
      <p className={css.filterDropdownLabel} id="filter-dropdown-label">
        Filters
      </p>

      <button
        className={css.filterDropdownButton}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="filter-dropdown-label"
      >
        {selectedOption?.label}
        {isOpen ? (
          <FilterUp aria-hidden="true" />
        ) : (
          <FilterDown aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <ul
          className={css.filterDropdownList}
          role="listbox"
          aria-label="Filter options"
        >
          {options.map((option) => (
            <li
              key={option.value}
              className={
                selected === option.value
                  ? `${css.filterDropdownItem} ${css.active}`
                  : css.filterDropdownItem
              }
              role="option"
              aria-selected={selected === option.value}
              tabIndex={0}
              onClick={() => handleOptionSelect(option.value)}
              onKeyDown={(e) => handleOptionKeyDown(e, option.value)}
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
