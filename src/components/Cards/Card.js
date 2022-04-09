import React, { useState } from "react";
import classes from "./Card.module.css";
import cardImages from "../../util/CardImages";

const Card = ({ className, name, type, onClick }) => {
  const [isActive, setIsActive] = useState(false);
  const classesList = `${classes.main} ${classes[type]} ${className} ${
    isActive && classes.active
  } `;
  const activateCard = () => {
    setIsActive(!isActive);
    onClick(name);
  };

  return (
    <div className={classesList} onClick={activateCard}>
      {name ? (
        <img src={cardImages[name]} alt="here" />
      ) : (
        <img src={cardImages["back.png"]} alt="here" />
      )}
    </div>
  );
};

export default Card;
