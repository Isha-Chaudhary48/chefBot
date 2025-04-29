export default function CustomImage(props) {
  return (
    <>
      <img
        className=" w-[80%] m-auto  mt-4 rounded-md "
        src={props.src}
        alt="{props.foodImg}"
      />
    </>
  );
}
