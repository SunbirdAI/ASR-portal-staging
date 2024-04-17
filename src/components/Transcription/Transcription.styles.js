import tw, {styled} from "twin.macro";

export const MainContainer = styled.div`
  ${tw`
    grid
    grid-cols-1
    md:grid-cols-2
    rounded-md
    m-3
   `}
`;

export const LanguageDropdown = styled.select`
  ${tw`
    px-3
    py-1.5
    mx-3
    my-1.5
    max-w-[250px]
    overflow-hidden
    break-normal
    border border-solid border-gray-300
    rounded
    ease-in-out
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
    `}
`;