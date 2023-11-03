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
      <ResumeBox title="המשחק נגמר">
        <div>
          זמן משחק: <strong>{secondsToTimeFormat(userData.timer)}</strong>
        </div>

        <div dir="rtl">
          היפוכי קפלים: <strong>{userData.flipCount}</strong>
        </div>

        <div dir="rtl">
          הניקוד שלך:{" "}
          <strong>
            {calculateScore({
              timeTaken: userData.timer,
              pairsMissed: userData.flipCount,
              bonus: userData.bonus,
            })}
          </strong>
        </div>
      </ResumeBox>

      <div dir="rtl" className="text-center">
        <button
          className="game-modal__btn btn-level selected"
          onClick={() => window.location.reload()}
        >
          נסה שוב!
        </button>
      </div>
    </>
  );
};
