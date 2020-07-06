import React, { useState, useEffect } from 'react';
import GradeDataService from '../services/GradeService';
import { Link } from 'react-router-dom';
import GradeView from './GradeView';

const GradeList = () => {
  const [grade, setGrade] = useState([]);
  const [currentGrade, setCurrentGrade] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    retrieveGrade();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveGrade = () => {
    GradeDataService.getAll()
      .then((response) => {
        setGrade(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveGrade();
    setCurrentGrade(null);
    setCurrentIndex(-1);
  };

  const setActiveGrade = (grade, index) => {
    setCurrentGrade(grade);
    setCurrentIndex(index);
  };

  const handleDeleteGrade = (id) => {
    GradeDataService.remove(id)
      .then((response) => {
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeAllGrade = () => {
    GradeDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleResetDataBase = () => {
    GradeDataService.importGrades()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    GradeDataService.findByName(searchName)
      .then((response) => {
        setGrade(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <h4>Grade List</h4>

        <ul className="list-group">
          {grade &&
            grade.map((grade, index) => (
              <GradeView
                grade={grade}
                onClick={() => setActiveGrade(grade, index)}
                onDelete={handleDeleteGrade}
                key={index}
                isCurrent={index === currentIndex}
              />
            ))}
        </ul>

        <button className="m-3 btn btn-sm btn-danger" onClick={removeAllGrade}>
          Remove All
        </button>
        <button onClick={handleResetDataBase} className="btn btn-success">
          Reset DataBase
          </button>
      </div>
    </div>
  );
};

export default GradeList;
