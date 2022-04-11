import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    setIsActive(selected);
  }, [selected]);

  return (
    <div className={classesList} onClick={activateCard}>
      {name ? (
        <img src={cardImages[name.name + ".png"]} alt={name.name} />
      ) : (
        <img src={cardImages["back.png"]} alt="here" />
      )}
    </div>
  );
};

export default Card;
