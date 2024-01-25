type HeadingProps = {
  title?: string;
  subtitle?: string;
  center?: boolean;
};

const Heading = (props: HeadingProps) => {
  return (
    <div className={`${props.center ? "text-center" : "text-start"}`}>
      <div className="text-2xl font-bold">{props.title}</div>
      <div className="mt-2 font-light text-neutral-600">{props.subtitle}</div>
    </div>
  );
};

export default Heading;
