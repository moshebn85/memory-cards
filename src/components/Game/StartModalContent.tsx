import { EXTRA_POINT, TOP_RESULTS } from "../../constants";
import { BonusCard } from "../BonusCard/BonusCard";
import { ResumeBox } from "./ResumeBox";

interface IStartModalContentProps {
  bonusCardPath: string;
  onClick: () => void;
}

export const StartModalContent: React.FC<IStartModalContentProps> = ({
  bonusCardPath,
  onClick,
}) => {
  return (
    <>
      <ResumeBox title="על המשחק">
        זהו משחק זיכרון שמטרתו לעזור לילדים ללמוד אוצר מילים באנגלית תוך כדי הנאה ואתגר
      </ResumeBox>

      <ResumeBox title="ניקוד">
        הציון מחושב תחילה עם 1000 נקודות ומופחת בנקודה
        אחת לשנייה. כאשר המשחק מסתיים, גם נקודות מופחתות
        בהתבסס על מספר הפעמים שזוג קלפים התהפך. המשחק
        מתחיל רק לאחר שהמשתמש לוחץ על הכרטיס הראשון כדי להפוך אותו.
      </ResumeBox>

      <ResumeBox title="קלף בונוס">
         (בעבודה)
        <div className="game-modal__resume__bonus-card">
          <BonusCard path={bonusCardPath} />
        </div>
      </ResumeBox>

      <div dir="rtl" className="text-center">
        <button
          className="game-modal__btn btn-level selected"
          onClick={onClick}
        >
          בואו נתחיל!
        </button>
      </div>
    </>
  );
};
