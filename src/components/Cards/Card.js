import React, { useState } from "react";
import classes from "./Card.module.css";
import cardImages from "../../util/CardImages";

const Card = ({ className, name, type, onClick, selected, rotate }) => {
  const [isActive, setIsActive] = useState(selected);
  const classesList = `${classes.main} ${classes[type]} ${className} ${
    isActive && classes.active
  } ${classes["rotate" + rotate]} `;
  const activateCard = () => {
    setIsActive(!isActive);
    onClick(name);
  };

  return (
    <div className={classesList} onClick={activateCard}>
      {name ? (
        <img src={cardImages[name + ".png"]} alt="here" />
      ) : (
        <img src={cardImages["back.png"]} alt="here" />
      )}
    </div>
  );
};

export default Card;
