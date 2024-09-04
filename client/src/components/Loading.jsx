import { Circles } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className=" flex items-center justify-center w-full h-screen">
      <Circles
        height={50}
        width={50}
        color="#FCA5A5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
