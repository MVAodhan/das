import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Nav = () => {
  return (
    <div className="bg-base-100 w-full flex">
      <div className="flex w-1/2 ">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex justify-end w-1/2 pr-5">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Nav;
