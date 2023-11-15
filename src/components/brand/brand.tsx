import { Link } from "react-router-dom";

interface Props {
  size: "large" | "small";
  clickable: boolean;
}

export function Brand(props: Props) {
  let brandClassName, premiumClassName;
  if (props.size === "large") {
    brandClassName = "text-4xl font-bold text-blue-600 leading-none";
    premiumClassName = "text-[12px] font-bold text-purple-900 leading-none";
  } else {
    brandClassName = "text-2xl font-bold text-blue-600 leading-none";
    premiumClassName = "text-[10px] font-bold text-purple-900 leading-none";
  }

  if (props.clickable) {
    return (
      <>
        <Link to="/" className="flex w-fit flex-col items-end">
          <p className={brandClassName}>LearnIt</p>
          <p className={premiumClassName}>Premium</p>
        </Link>
      </>
    );
  } else {
    return (
      <div className="flex w-fit flex-col items-end">
        <p className={brandClassName}>LearnIt</p>
        <p className={premiumClassName}>Premium</p>
      </div>
    );
  }
}
