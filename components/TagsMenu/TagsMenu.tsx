'use client';

import css from '@/components/TagsMenu/TagsMenu.module.css';

import Link from 'next/link';
import { useState } from 'react';

const TagsMenu = () => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownIsOpen(prev => !prev);
  };

  const handleOptionClick = () => {
    setDropdownIsOpen(false); 
  };

  return (
    <div className={css.menuContainer}>
      <button onClick={handleDropdownToggle} className={css.menuButton}>
        {dropdownIsOpen ? 'Notes ▴' : 'Notes ▾'}
      </button>
      {dropdownIsOpen && (
        <ul className={css.menuList}>
          {['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'].map(tag => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={handleOptionClick} 
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
