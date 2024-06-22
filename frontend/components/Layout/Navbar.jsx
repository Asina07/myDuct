import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-[99] w-full">
      <div className="flex h-16 items-center justify-between bg-sky-800 px-5 py-1 text-white">
        <div className=" flex items-center gap-5 font-bold text-xl ">
          My Duct
        </div>

        <div className="flex flex-1 justify-end gap-3">
          <div className="hidden max-w-max  sm:block mt-2">Shabeer</div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
