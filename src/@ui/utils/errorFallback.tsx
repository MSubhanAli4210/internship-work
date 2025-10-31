export function ErrorFallback({ error }: any) {

  return (
    <div className="h-screen w-screen">
      <div className="p-10 flex flex-col">
        <img src="/" alt="" />
        <h2 className="text-red-500 font-bold text-2xl">
          Something went wrong!
        </h2>
        <small>{error.message}</small>
        <small className="text-gray-500">
          We hope it will be resolved soon..Please be patient..
        </small>
    
      </div>
    </div>
  );
}