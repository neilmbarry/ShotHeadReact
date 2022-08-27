import React, { useState, useEffect, Suspense } from "react";
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
    },
    visible: {
      y: 0,
      opacity: 1,

      scale: activeScale,
      transition: {},
    },
    exit: {
      y: -30,
      opacity: 0,

      transition: {
        duration: 0.3,
      },
    },
    hover: {
      scale: activeHover,
    },
  };

  const faceVariants = {
    hidden: {
      y: -50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,

      scale: activeScale,
      transition: {},
    },
    exit: {
      y: -30,
      opacity: 0,

      transition: {
        duration: 0.3,
      },
    },
    hover: {
      scale: activeHover,
    },
  };

  const deckVariants = {
    hidden: {
      opacity: 0,
      scale: 1.2,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      y: 50,
      opacity: 0,
    },
    hover: {},
  };

  const stackVariants = {
    hidden: {
      opacity: 0,
      scale: 1.2,
      rotateZ: cardRotate - 220,
    },
    visible: {
      opacity: 1,
      scale: 1.2,
      rotateZ: cardRotate + 15,
      transition: {
        type: "spring",

        duration: 0.5,
        delay: 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      rotateZ: 520,
      transition: {
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

  if (type === "face") {
    variants = faceVariants;
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit={variants.exit}
      whileHover={variants.hover}
      layout
      className={classesList}
      onClick={activateCard}
      style={{
        backgroundImage: `url(${cardImages["back.jpg"]})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      key={name.name}
    >
      {/* <Suspense fallback={<img src={cardImages["back.jpg"]} alt={name} />}> */}
      <img
        // onLoad={(e) => {
        //   console.log(e);
        //   e.target.className = classes.visible;
        // }}
        src={back ? cardImages["back.jpg"] : cardImages[name.name + ".jpg"]}
        alt={name.name}
      />
      {/* </Suspense> */}
    </motion.div>
  );
};

export default Card;
