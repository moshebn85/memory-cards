import classNames from "classnames";
import { RankingBuilder } from "ranking-builder";
import { useState } from "react";
import { EXTRA_POINT } from "../../constants";
import { calculateScore, secondsToTimeFormat } from "../../utils";
import { UserData } from "./Game";
import { ResumeBox } from "./ResumeBox";

interface IFinishModalContentProps {
  onSubmit: () => void;

  userData: UserData;
}

export const FinishModalContent: React.FC<IFinishModalContentProps> = ({
  onSubmit,

  userData,
}) => {
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(true);

  return (
    <>
      <ResumeBox title="Game Over">
        <div>
          Your time: <strong>{secondsToTimeFormat(userData.timer)}</strong>
        </div>

        <div>
          Flips: <strong>{userData.flipCount}</strong>
        </div>

        <div>
          Your score:{" "}
          <strong>
            {calculateScore({
              timeTaken: userData.timer,
              pairsMissed: userData.flipCount,
              bonus: userData.bonus,
            })}
          </strong>
        </div>
      </ResumeBox>

      <div className="text-center">
        <button
          className="game-modal__btn btn-level selected"
          onClick={() => window.location.reload()}
        >
          Try again!
        </button>
      </div>
    </>
  );
};
