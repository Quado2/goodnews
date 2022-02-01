import Link from 'next/link'
import classes from './MainNavigation.module.css';
import {navItems} from './data'

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Logo</div>
      <nav>
        <ul>
          {navItems && navItems.map((nav, i) => {
            return <li key={i}>
              <Link href={nav.link}>{nav.title}</Link>
            </li>
          })}
         
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
