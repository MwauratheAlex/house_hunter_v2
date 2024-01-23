const Container = (props: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-[2520px] px-4 sm:px-2 md:px-10  lg:px-20">
      {props.children}
    </div>
  );
};

export default Container;
