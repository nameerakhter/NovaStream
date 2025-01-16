// import { SignUp } from "@clerk/nextjs";

// export default function Page() {
// 	return (
// 		<SignUp />
// 	)
// }

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 h-full w-full blur-md rounded-xl bg-gradient-to-br from-purple-500 to-pink-500"></div>
        <div className="relative z-10">
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: "text-black font-bold py-2 px-4 ",
                card: "shadow-xl rounded-lg p-8 bg-black",
                header: "text-3xl font-bold mb-6 text-white",
                socialButtons:"flex border-[#242428] border-[2px] rounded-lg gap-2 hover:bg-[#242428]",
                dividerLine: "my-4 border-t border-gray-300",
              },
            }}
          />
        </div>
      </div>
    </>
  );
}
