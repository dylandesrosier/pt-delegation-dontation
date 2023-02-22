import classNames from "classnames";

export const PoweredByPoolTogether = (props: { className?: string }) => {
  return (
    <a
      className={classNames(
        "flex items-center justify-center",
        props.className
      )}
      href="https://pooltogether.com?utm_source=delegation-donation-app&utm_medium=footer-link&utm_campaign=delegation-donation"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by{" "}
      <img
        src="/pooltogether.svg"
        alt="PoolTogether Logo"
        className="h-8 ml-2"
      />
    </a>
  );
};
