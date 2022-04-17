import React, { useState, useEffect } from "react";
import classes from "./Card.module.css";
import cardImages from "../../util/CardImages";
import { motion } from "framer-motion";

const Card = ({
  className,
  name,
  type,
  onClick,
  selected,
  rotate,
  back,
  shift,
}) => {
  const [isActive, setIsActive] = useState(selected);

  const shifted = {
    transform: `translate(${shift / 4}px,${shift / 6}px)`,
  };

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
    <motion.div
      // whileHover={{ scale: 1.1 }}
      className={classesList}
      onClick={activateCard}
      style={shifted}
    >
      {name ? (
        <img
          src={back ? cardImages["back.png"] : cardImages[name.name + ".png"]}
          alt={name.name}
        />
      ) : (
        <img src={cardImages["back.png"]} alt="here" />
      )}
    </motion.div>
  );
};

export default Card;
