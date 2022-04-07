import React from "react";
import classes from "./Card.module.css";
import cardImages from "../../util/CardImages";

const Card = ({ className, name, type }) => {
  const classesList = `${classes.main} ${classes[type]} ${className} `;
  console.log(cardImages[name]);

  return (
    <div className={classesList}>
      {name ? (
        <img src={cardImages[name]} alt="here" />
      ) : (
        <img src={cardImages["back.png"]} alt="here" />
      )}
    </div>
  );
};

export default Card;
