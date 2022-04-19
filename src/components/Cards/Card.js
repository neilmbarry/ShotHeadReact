import React, { useState, useEffect } from "react";
import classes from "./Card.module.css";
import cardImages from "../../util/CardImages";
import { motion, AnimatePresence } from "framer-motion";

const Card = ({
  className,
  name,
  onClick,
  selected,
  rotate,
  back,
  shift,
  type,
}) => {
  const [isActive, setIsActive] = useState(selected);

  const shifted = {
    transform: `translate(${shift / 4}px,${shift / 6}px)`,
  };

  const classesList = `${classes.main} ${className} ${
    isActive && classes.active
  } ${classes["rotate" + rotate]} ${name ? name.name : "back"} `;
  const activateCard = () => {
    setIsActive(!isActive);
    onClick(name);
  };

  // const stackLocation = document
  //   .querySelector(".Stack_main__1xxX0")
  //   .getBoundingClientRect();

  // const cardLocation = document
  //   .querySelector(`.${name ? name.name : "back"}`)
  //   .getBoundingClientRect();

  // console.log("stackLocation", stackLocation);
  // console.log("cardLocation", cardLocation);

  useEffect(() => {
    setIsActive(selected);
  }, [selected]);

  const activeScale = selected ? 1.2 : 1.0;
  const activeHover = selected ? 1.2 : 1.1;
  const cardRotate = rotate ? ((rotate + 1) * 25) % 360 : 0;
  // console.log(cardRotate, "<----rotation");

  let variants;

  const defaultVariants = {
    hidden: {
      y: -50,
      opacity: 0,
      scale: 0.8,

      // rotate: "0deg",
    },
    visible: {
      y: 0,
      opacity: 1,

      scale: activeScale,
      transition: {
        // type: "spring",
        // delay: 0.5,
        // duration: 0.2,
      },
    },
    exit: {
      y: -50,
      opacity: 0,
      scale: 0.7,
    },
    hover: {
      scale: activeHover,
    },
  };

  const deckVariants = {
    hidden: {
      opacity: 0,
      scale: 1.5,
      // rotateZ: 360,
      // rotate: "0deg",
    },
    visible: {
      opacity: 1,

      scale: 1,
      rotateZ: 0,
      transition: {
        type: "tween",
        // ease: [0.2, 0.8, 0.9, 0.98],
        ease: "easeOut",
        delay: 0.2,
        duration: 0.2,
      },
    },
    exit: {
      y: 50,
      opacity: 0,
      scale: 0.9,
    },
    hover: {},
  };

  const stackVariants = {
    hidden: {
      opacity: 0,
      scale: 1.7,
      rotateZ: cardRotate - 220,
      // rotate: "0deg",
    },
    visible: {
      opacity: 1,

      scale: 1.2,
      rotateZ: cardRotate + 15,
      transition: {
        type: "spring",
        // delay: 0.2,
        duration: 0.6,
      },
    },
    exit: {
      // y: 50,
      opacity: 0,
      scale: 0.5,
      rotateZ: 520,
      transition: {
        // type: "spring",
        // delay: 0.2,
        duration: 0.3,
      },
    },
    hover: {},
  };

  variants = defaultVariants;

  if (type === "deck") {
    variants = deckVariants;
  }

  if (type === "stack") {
    variants = stackVariants;
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit={variants.exit}
      whileHover={variants.hover}
      layout
      // whileHover={{ scale: 1.1 }}
      className={classesList}
      onClick={activateCard}
      style={shifted}
      key={name.name}
    >
      <img
        src={back ? cardImages["back.jpg"] : cardImages[name.name + ".jpg"]}
        alt={name}
      />
    </motion.div>
  );
};

export default Card;
