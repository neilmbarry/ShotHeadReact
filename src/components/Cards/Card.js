import React, { useState, useEffect } from "react";
import classes from "./Card.module.css";
import cardImages from "../../util/CardImages";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      <motion.div
        initial={{ y: -50, opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, x: 300, scale: 2 }}
        // whileHover={{ scale: 1.1 }}
        className={classesList}
        onClick={activateCard}
        style={shifted}
      >
        {name ? (
          <img
            src={back ? cardImages["back.jpg"] : cardImages[name.name + ".jpg"]}
            alt={name.name}
          />
        ) : (
          <img src={cardImages["back.jpg"]} alt="here" />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Card;
