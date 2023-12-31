import { useMemo, useState } from "react";

import {
  getCards,
  getCardsNew,
  getPath,
  mapAssetsByName,
  randomNumber,
  shuffle,
  useCheat,
} from "../../utils";
import classNames from "classnames";

import "./Game.css";
import { RankingBuilder } from "ranking-builder";
import { Modal } from "../Modal/Modal";
import { MAX_CARDS } from "../../constants";
import { ActiveCheatModalContent } from "./ActiveCheatModalContent";
import { StartModalContent } from "./StartModalContent";
import { FinishModalContent } from "./FinishModalContent";
import { GameContent } from "./GameContent";

export interface Card {
  flipped: boolean;
  matched: boolean;
  path: string;
}

export interface FormattedCard {
  flipped: boolean;
  id: string;
  matched: boolean;
  secretKey?: string;
}

export enum Level {
  Easy = "EASY",
  Normal = "NORMAL",
  Hard = "HARD",
}

export type UserData = {
  timer: number;
  flipCount: number;
  bonus: boolean;
};

export type TLevel = {
  cards: Card[];
  columns: number;
  size: number;
  total: number;
  value: Level;
};

type TLevels = {
  [key in Level]: TLevel;
};

export const levels: TLevels = {
  [Level.Easy]: {
    cards: getCardsNew(6),
    columns: 4,
    size: 200,
    total: 6,
    value: Level.Easy,
  },
  [Level.Normal]: {
    cards: getCardsNew(10),
    columns: 5,
    size: 150,
    total: 10,
    value: Level.Normal,
  },
  [Level.Hard]: {
    cards: getCardsNew(18),
    columns: 6,
    size: 100,
    total: 18,
    value: Level.Hard,
  },
};

export function Game({
  level: selectedLevel,

}: {
  level: Level;

}) {
  const [showModal, setShowModal] = useState(true);
  const [view, setView] = useState<"start" | "finish" | "activeCheat">("start");

  const [userData, setUserData] = useState<UserData>({
    timer: 0,
    flipCount: 0,
    bonus: false,
  });

  const level = levels[selectedLevel];

  const activeCheat = useCheat();

  const bonusCardPath = useMemo(() => getPath(randomNumber(MAX_CARDS)), []);

  return (
    <>
      <GameContent
        activeCheat={activeCheat}
        bonusCardPath={bonusCardPath}
        className={classNames({ showCards: activeCheat })}
        cards={mapAssetsByName(shuffle([...level.cards, ...level.cards]))}
        level={level}
        onFinish={(userData) => {
          setShowModal(true);

          if (!activeCheat) {
            setUserData(userData);
            setView("finish");

            return;
          } else {
            setView("activeCheat");

            return;
          }
        }}
      />

      {showModal && (
        <Modal className="game-modal">
          <h1 dir="rtl" className="game-modal__title">משחק הזיכרון שלי</h1>

          {view === "activeCheat" && <ActiveCheatModalContent />}

          {view === "start" && (
            <StartModalContent
              bonusCardPath={bonusCardPath}
              onClick={() => setShowModal((showModal) => !showModal)}
            />
          )}

          {view === "finish" && (
            <FinishModalContent
              onSubmit={() => setShowModal((showModal) => !showModal)}
     
              userData={userData}
            />
          )}
        </Modal>
      )}
    </>
  );
}
