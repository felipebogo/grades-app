import React from 'react'
import { Link } from 'react-router-dom';

const styles = {
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "nowrap",
  },
  spanTitle: {
    fontWeight: "600",
    marginRight: "10px",
  },
  spanValue: {
    marginleft: "20px",
  },
  col: {
    flex:"1"
  }
};

export default function GradeView({ grade, isCurrent, onClick, onDelete }) {
  console.log(grade);
  const { name, subject, type, value, id } = grade;

  const handleClick = () => {
    onClick();
  };
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <li
      className={'list-group-item ' + (isCurrent ? 'active' : '')}
      onClick={handleClick}
    >
      <span style={{ fontWeight: "600" }}>{name}</span>
      <div style={styles.flexRow}>
        <div style={styles.col}>
          <span style={styles.spanTitle}>Subject:</span>
          <span style={styles.spanValue}>{subject}</span>
        </div>
        <div style={styles.col}>
          <span style={styles.spanTitle}>type:</span>
          <span style={styles.spanValue}>{type}</span>
        </div>
        <div style={styles.col}>
          <span style={styles.spanTitle}>value:</span>
          <span style={styles.spanValue}>{value}</span>
        </div>
      </div>
      {isCurrent ? <div style={styles.flexCol}>
        <Link
          to={`/grade/${id}`}
          className="badge badge-warning"
        >Edit
        </Link> 
        <button
          style={{border:"none", marginLeft:"5px"}}
          to={`/grade/${id}`}
          className="badge badge-danger"
          onClick={handleDelete}
        >Delete
        </button> 
      </div> : null}
    </li>
  )
}
