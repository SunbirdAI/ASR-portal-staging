import tw, { styled } from "twin.macro";

export const Nav = styled.div`
  ${tw`
    flex
    fixed
    inset-x-0
    bottom-0
    items-center
    justify-center
    p-4
    bg-gray-800
    text-white
    z-50
  `}
`;

export const AudioPlayerContainer = styled.div`
  ${tw`w-full max-w-md mx-auto my-2`}
`;

export const File = styled.h1`
  ${tw`
    font-semibold
    text-lg
    text-center
  `}
`;
