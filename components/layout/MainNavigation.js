import Link from 'next/link'
import classes from './MainNavigation.module.css';


function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Logo</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/new-meetup'>Membership</Link>
          </li>
          <li>
            <Link href='/new-meetup'>Partner</Link>
          </li>
          <li>
            <Link href='/new-meetup'>Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
