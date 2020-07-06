import React from 'react'
import { Link } from 'react-router-dom';
import './GradeView.css';



export default function GradeView({ grade, isCurrent, onClick, onDelete }) {
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
      <div className="flexRow flexCol">
        <div className="col">
          <span className="spanTitle">Subject:</span>
          <span className="spanValue">{subject}</span>
        </div>
        <div className="col">
          <span className="spanTitle">type:</span>
          <span className="spanValue">{type}</span>
        </div>
        <div className="col">
          <span className="spanTitle">value:</span>
          <span className="spanValue">{value}</span>
        </div>
      </div>
      {isCurrent ? <div className="flexCol">
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
