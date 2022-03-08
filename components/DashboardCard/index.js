import styled from "styled-components";
import Link from "next/link";
import styles from './styles.module.scss'



export default function DashboardCard({ title, icon, textColor, bColor, link }) {
  return (
    <Link href={link}>
      <div className={styles.dc_container} style={{backgroundColor: bColor, color: textColor}}  >
      {icon} <h3>{title}</h3> 
      </div>
    </Link>
  );
}
